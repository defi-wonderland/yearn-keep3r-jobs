import chai, { expect } from 'chai';
import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import {
  IKeep3rV2,
  IKeep3rHelper,
  IStealthRelayer,
  IMechanicsRegistry,
  IV2Keeper,
  IBaseStrategy,
  HarvestV2Keep3rStealthJob,
  HarvestV2Keep3rStealthJob__factory,
  HarvestV2Keep3rStealthJobForTest,
  HarvestV2Keep3rStealthJobForTest__factory,
} from '@typechained';
import { Wallet } from 'ethers';
import { wallet, bn, behaviours, evm, constants } from '@utils';
import { ethers } from 'hardhat';
import * as common from './common';

chai.use(smock.matchers);

const COOLDOWN = 60;

describe('HarvestV2Keep3rStealthJob', () => {
  let harvestJob: MockContract<HarvestV2Keep3rStealthJobForTest>;
  let harvestJobFactory: MockContractFactory<HarvestV2Keep3rStealthJobForTest__factory>;
  let randomAddress: string;
  let governor: Wallet;
  let snapshotId: string;

  let keep3r: FakeContract<IKeep3rV2>;
  let keep3rHelper: FakeContract<IKeep3rHelper>;
  let stealthRelayer: FakeContract<IStealthRelayer>;
  let mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  let v2Keeper: FakeContract<IV2Keeper>;
  let strategy: FakeContract<IBaseStrategy>;

  before(async () => {
    governor = await wallet.generateRandom();
    randomAddress = wallet.generateRandomAddress();
    harvestJobFactory = await smock.mock<HarvestV2Keep3rStealthJobForTest__factory>('HarvestV2Keep3rStealthJobForTest');

    ({ mechanicsRegistry, stealthRelayer, strategy, keep3r, keep3rHelper, v2Keeper, mechanicsRegistry } = await common.setupFakes());
    await wallet.setBalance({ account: stealthRelayer.address, balance: bn.toUnit(10) });

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);

    harvestJob = await harvestJobFactory.connect(governor).deploy(
      governor.address, // address _governor
      mechanicsRegistry.address, // address _mechanicsRegistry,
      stealthRelayer.address, // address _stealthRelayer,
      v2Keeper.address, // address _v2Keeper,
      COOLDOWN, // uint256 _workCooldown
      keep3r.address, // address _keep3r
      keep3rHelper.address, // address _keep3rHelper
      constants.ZERO_ADDRESS, // address _bond
      0, // uint256 _minBond
      0, // uint256 _earned
      0, // uint256 _age
      false // bool _onlyEOA
    );
  });

  describe('constructor', () => {
    let deployed: MockContract<HarvestV2Keep3rStealthJob>;

    const GOVERNOR = wallet.generateRandomAddress();
    const MECHANICS_REGISTRY = wallet.generateRandomAddress();
    const STEALTH_RELAYER = wallet.generateRandomAddress();
    const V2_KEEPER = wallet.generateRandomAddress();
    const COOLDOWN = Math.floor(Math.random() * 100);
    const KEEP3R = wallet.generateRandomAddress();
    const KEEP3R_HELPER = wallet.generateRandomAddress();
    const BOND = wallet.generateRandomAddress();
    const MIN_BOND = bn.toUnit(Math.floor(Math.random() * 100));
    const EARNED = bn.toUnit(Math.floor(Math.random() * 100));
    const AGE = Math.floor(Math.random() * 100);
    const ONLY_EOA = Boolean(Math.floor(Math.random() * 2));

    beforeEach(async () => {
      const factory = await smock.mock<HarvestV2Keep3rStealthJob__factory>('HarvestV2Keep3rStealthJob');
      deployed = await factory
        .connect(governor)
        .deploy(
          GOVERNOR,
          MECHANICS_REGISTRY,
          STEALTH_RELAYER,
          V2_KEEPER,
          COOLDOWN,
          KEEP3R,
          KEEP3R_HELPER,
          BOND,
          MIN_BOND,
          EARNED,
          AGE,
          ONLY_EOA
        );
    });

    it('should set governor', async () => {
      expect(await deployed.governor()).to.eq(GOVERNOR);
    });

    it('should set mechanicsRegistry', async () => {
      expect(await deployed.mechanicsRegistry()).to.eq(MECHANICS_REGISTRY);
    });

    it('should set v2Keeper', async () => {
      expect(await deployed.v2Keeper()).to.eq(V2_KEEPER);
    });

    it('should set workCooldown', async () => {
      expect(await deployed.workCooldown()).to.eq(COOLDOWN);
    });

    it('should set stealthRelayer address', async () => {
      expect(await deployed.stealthRelayer()).to.eq(STEALTH_RELAYER);
    });

    it('should set keep3r address', async () => {
      expect(await deployed.keep3r()).to.eq(KEEP3R);
    });

    it('should set keep3rHelper address', async () => {
      expect(await deployed.keep3rHelper()).to.eq(KEEP3R_HELPER);
    });

    it('should set keep3rRequirements', async () => {
      expect(await deployed.requiredBond()).to.eq(BOND);
      expect(await deployed.requiredMinBond()).to.eq(MIN_BOND);
      expect(await deployed.requiredEarnings()).to.eq(EARNED);
      expect(await deployed.requiredAge()).to.eq(AGE);
    });

    it('should set onlyEOA', async () => {
      expect(await deployed.onlyEOA()).to.eq(ONLY_EOA);
    });

    it('should reduce the gasMultiplier by 15%', async () => {
      const BASE_MULTIPLIER = 10_000; // over a 10_000 base
      expect(await deployed.gasMultiplier()).to.eq((BASE_MULTIPLIER * 85) / 100);
    });

    it('should emit events', async () => {
      const tx = deployed.deployTransaction;

      await expect(tx).to.emit(deployed, 'Keep3rSet').withArgs(KEEP3R);
      await expect(tx).to.emit(deployed, 'Keep3rHelperSet').withArgs(KEEP3R_HELPER);
      await expect(tx).to.emit(deployed, 'StealthRelayerSet').withArgs(STEALTH_RELAYER);
      await expect(tx).to.emit(deployed, 'Keep3rRequirementsSet').withArgs(BOND, MIN_BOND, EARNED, AGE);
      await expect(tx).to.emit(deployed, 'OnlyEOASet').withArgs(ONLY_EOA);
    });
  });

  describe('workable', () => {
    let timestamp: number;

    beforeEach(async () => {
      stealthRelayer.caller.reset();
      strategy.harvestTrigger.reset();
      strategy.harvestTrigger.returns(true);

      await harvestJob.connect(governor).addStrategy(strategy.address, 0);

      timestamp = (await ethers.provider.getBlock('latest')).timestamp;
    });

    it('should return false if cooldown not expired', async () => {
      await harvestJob.setVariable('lastWorkAt', { [strategy.address]: timestamp });
      await harvestJob.setVariable('workCooldown', 10);

      expect(await harvestJob.workable(strategy.address)).to.be.false;
    });

    context('when cooldown has expired', () => {
      beforeEach(async () => {
        await harvestJob.setVariable('lastWorkAt', { [strategy.address]: timestamp - COOLDOWN - 1 });
      });

      it('should query harvestTrigger with callCost with requiredAmount per gasPrice', async () => {
        const REQUIRED_AMOUNT = 100;
        const GAS_PRICE = 64;

        await harvestJob.setVariable('requiredAmount', { [strategy.address]: REQUIRED_AMOUNT });
        await harvestJob.setVariable('_baseFee', GAS_PRICE);

        await harvestJob.workable(strategy.address);

        expect(strategy.harvestTrigger).to.be.calledOnceWith(REQUIRED_AMOUNT * GAS_PRICE);
      });

      it('should return strategy response', async () => {
        strategy.harvestTrigger.returns(true);
        expect(await harvestJob.workable(strategy.address)).to.be.true;
        strategy.harvestTrigger.returns(false);
        expect(await harvestJob.workable(strategy.address)).to.be.false;
      });
    });
  });

  describe('work', () => {
    const keeperAddress = wallet.generateRandomAddress();

    beforeEach(async () => {
      keep3r.bondedPayment.reset();
      stealthRelayer.caller.reset();
      keep3r.isBondedKeeper.reset();
      v2Keeper.harvest.reset();

      keep3rHelper.quote.returns(1);
      strategy.harvestTrigger.returns(true);
      keep3r.isBondedKeeper.returns(true);
      stealthRelayer.caller.returns(keeperAddress);

      await harvestJob.connect(governor).addStrategy(strategy.address, 0);
    });

    behaviours.onlyStealthRelayer(
      () => harvestJob,
      'work',
      () => [stealthRelayer.wallet],
      () => [strategy.address]
    );

    it('should set lastWorkAt', async () => {
      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(await harvestJob.lastWorkAt(strategy.address)).to.be.eq(timestamp);
    });

    it('should query caller from stealthRelayer', async () => {
      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);

      expect(stealthRelayer.caller).to.be.calledOnce;
    });

    it('should ask Keep3r if caller is valid keeper', async () => {
      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);

      expect(keep3r.isBondedKeeper).to.be.calledOnce;
    });

    it('should revert if caller is not valid keeper', async () => {
      keep3r.isBondedKeeper.returns(false);

      await expect(harvestJob.connect(stealthRelayer.wallet).work(strategy.address)).to.be.revertedWith('KeeperNotValid()');
    });

    it('should call harvest on v2Keeper with strategy', async () => {
      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);

      expect(v2Keeper.harvest).to.be.calledOnceWith(strategy.address);
    });

    it('should call bondedPayment on Keep3rV2', async () => {
      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);

      expect(keep3r.bondedPayment).to.be.calledOnce;
    });

    it('should validate onlyEOA', async () => {
      // await harvestJob.setVariable('onlyEOA', true) // bug in smock overwriting nearby variables
      await harvestJob.connect(governor).setOnlyEOA(true);

      await expect(harvestJob.connect(stealthRelayer.wallet).work(strategy.address)).to.be.revertedWith('OnlyEOA()');
      stealthRelayer.caller.returns(stealthRelayer.address);
      await expect(harvestJob.connect(stealthRelayer.wallet).work(strategy.address)).not.to.be.reverted;
    });

    it('should revert if not workable', async () => {
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;
      await harvestJob.setVariable('lastWorkAt', { [strategy.address]: timestamp });
      await harvestJob.setVariable('workCooldown', 10);

      await expect(harvestJob.connect(stealthRelayer.wallet).work(strategy.address)).to.be.revertedWith('StrategyNotWorkable()');
    });

    it('should query keeper requirements on Keep3rV2', async () => {
      const MIN_BOND = 50_000;
      const BOND = wallet.generateRandomAddress();
      const EARNED = bn.toUnit(10);
      const AGE = 1_000;

      keep3r.isBondedKeeper.reset();
      keep3r.isBondedKeeper.returns(true);

      await harvestJob.setVariable('requiredBond', BOND);
      await harvestJob.setVariable('requiredMinBond', MIN_BOND);
      await harvestJob.setVariable('requiredEarnings', EARNED);
      await harvestJob.setVariable('requiredAge', AGE);

      await harvestJob.connect(stealthRelayer.wallet).work(strategy.address);
      expect(keep3r.isBondedKeeper).to.have.been.calledOnce;
    });
  });

  describe('forceWorkUnsafe', () => {
    behaviours.onlyGovernorOrMechanic(
      () => harvestJob,
      'forceWorkUnsafe',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should emit event', async () => {
      const tx = await harvestJob.connect(governor).forceWorkUnsafe(randomAddress);

      await expect(tx).to.emit(harvestJob, 'ForceWorked').withArgs(randomAddress);
    });
  });

  describe('forceWork', () => {
    const CALLER = wallet.generateRandomAddress();

    beforeEach(async () => {
      mechanicsRegistry.isMechanic.reset();
      stealthRelayer.caller.reset();

      await wallet.setBalance({ account: stealthRelayer.address, balance: ethers.BigNumber.from('0xfffffffffffffffff') });
      stealthRelayer.caller.returns(CALLER);

      await harvestJob.setVariable('governor', CALLER);
    });

    behaviours.onlyStealthRelayer(
      () => harvestJob,
      'forceWork',
      () => [stealthRelayer.wallet],
      () => [randomAddress]
    );

    it('should query caller from stealthRelayer', async () => {
      await harvestJob.connect(stealthRelayer.wallet).forceWork(randomAddress);

      expect(stealthRelayer.caller).to.be.calledOnce;
    });

    it('should query mechanicsRegistry with the caller', async () => {
      mechanicsRegistry.isMechanic.returns(true);
      await harvestJob.setVariable('governor', constants.ZERO_ADDRESS);

      await harvestJob.connect(stealthRelayer.wallet).forceWork(randomAddress);

      expect(mechanicsRegistry.isMechanic).to.be.calledOnceWith(CALLER);
    });

    it('should revert if caller is not governor or mechanic', async () => {
      mechanicsRegistry.isMechanic.returns(false);
      await harvestJob.setVariable('governor', constants.ZERO_ADDRESS);

      await expect(harvestJob.connect(stealthRelayer.wallet).forceWork(randomAddress)).to.be.revertedWith('OnlyGovernorOrMechanic()');
    });

    it('should emit event', async () => {
      const tx = await harvestJob.connect(stealthRelayer.wallet).forceWork(randomAddress);

      await expect(tx).to.emit(harvestJob, 'ForceWorked').withArgs(randomAddress);
    });
  });
});
