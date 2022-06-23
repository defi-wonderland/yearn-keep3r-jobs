import chai, { expect } from 'chai';
import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import {
  IKeep3rV2,
  IKeep3rHelper,
  IMechanicsRegistry,
  IV2Keeper,
  IBaseStrategy,
  V2JobProxyForTest,
  V2JobProxyForTest__factory,
  TendV2Keep3rJob,
  TendV2Keep3rJob__factory,
  TendV2Keep3rJobForTest,
  TendV2Keep3rJobForTest__factory,
} from '@typechained';
import { Wallet } from 'ethers';
import { wallet, bn, behaviours, evm, constants } from '@utils';
import { ethers } from 'hardhat';
import * as common from './common';

chai.use(smock.matchers);

const COOLDOWN = 60;

describe('TendV2Keep3rJob', () => {
  let tendJob: MockContract<TendV2Keep3rJobForTest>;
  let tendJobFactory: MockContractFactory<TendV2Keep3rJobForTest__factory>;
  let randomAddress: string;
  let governor: Wallet;
  let randomCaller: Wallet;
  let snapshotId: string;

  let keep3r: FakeContract<IKeep3rV2>;
  let keep3rHelper: FakeContract<IKeep3rHelper>;
  let mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  let v2Keeper: FakeContract<IV2Keeper>;
  let strategy: FakeContract<IBaseStrategy>;

  before(async () => {
    governor = await wallet.generateRandom();
    randomCaller = await wallet.generateRandom();
    randomAddress = wallet.generateRandomAddress();
    tendJobFactory = await smock.mock<TendV2Keep3rJobForTest__factory>('TendV2Keep3rJobForTest');

    ({ mechanicsRegistry, strategy, keep3r, keep3rHelper, v2Keeper } = await common.setupFakes());

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);

    tendJob = await tendJobFactory.connect(governor).deploy(
      governor.address, // address _governor
      mechanicsRegistry.address, // address _mechanicsRegistry,
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
    let deployed: MockContract<TendV2Keep3rJob>;

    const GOVERNOR = wallet.generateRandomAddress();
    const MECHANICS_REGISTRY = wallet.generateRandomAddress();
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
      const factory = await smock.mock<TendV2Keep3rJob__factory>('TendV2Keep3rJob');
      deployed = await factory
        .connect(governor)
        .deploy(GOVERNOR, MECHANICS_REGISTRY, V2_KEEPER, COOLDOWN, KEEP3R, KEEP3R_HELPER, BOND, MIN_BOND, EARNED, AGE, ONLY_EOA);
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

    it('should set keep3r', async () => {
      expect(await deployed.keep3r()).to.eq(KEEP3R);
    });

    it('should set keep3rHelper', async () => {
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

    it('should emit events', async () => {
      const tx = deployed.deployTransaction;

      await expect(tx).to.emit(deployed, 'Keep3rSet').withArgs(KEEP3R);
      await expect(tx).to.emit(deployed, 'Keep3rHelperSet').withArgs(KEEP3R_HELPER);
      await expect(tx).to.emit(deployed, 'Keep3rRequirementsSet').withArgs(BOND, MIN_BOND, EARNED, AGE);
      await expect(tx).to.emit(deployed, 'OnlyEOASet').withArgs(ONLY_EOA);
    });
  });

  describe('workable', () => {
    let timestamp: number;

    beforeEach(async () => {
      strategy.tendTrigger.reset();
      strategy.tendTrigger.returns(true);

      await tendJob.connect(governor).addStrategy(strategy.address, 0);

      timestamp = (await ethers.provider.getBlock('latest')).timestamp;
    });

    it('should return false if cooldown not expired', async () => {
      await tendJob.setVariable('lastWorkAt', { [strategy.address]: timestamp });
      await tendJob.setVariable('workCooldown', 10);

      expect(await tendJob.workable(strategy.address)).to.be.false;
    });

    context('when cooldown has expired', () => {
      beforeEach(async () => {
        await tendJob.setVariable('lastWorkAt', { [strategy.address]: timestamp - COOLDOWN - 1 });
      });

      it('should query tendTrigger with callCost with requiredAmount per gasPrice', async () => {
        const REQUIRED_AMOUNT = 100;
        const GAS_PRICE = 64;

        await tendJob.setVariable('requiredAmount', { [strategy.address]: REQUIRED_AMOUNT });
        await tendJob.setVariable('_baseFee', GAS_PRICE);

        await tendJob.workable(strategy.address);

        expect(strategy.tendTrigger).to.be.calledOnceWith(REQUIRED_AMOUNT * GAS_PRICE);
      });

      it('should return strategy response', async () => {
        strategy.tendTrigger.returns(true);
        expect(await tendJob.workable(strategy.address)).to.be.true;
        strategy.tendTrigger.returns(false);
        expect(await tendJob.workable(strategy.address)).to.be.false;
      });
    });
  });

  describe('work', () => {
    beforeEach(async () => {
      keep3r.bondedPayment.reset();
      keep3r.isBondedKeeper.reset();
      v2Keeper.tend.reset();

      keep3rHelper.quote.returns(1);
      strategy.tendTrigger.returns(true);
      keep3r.isBondedKeeper.returns(true);

      await tendJob.connect(governor).addStrategy(strategy.address, 0);
    });

    it('should set lastWorkAt', async () => {
      await tendJob.work(strategy.address);
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(await tendJob.lastWorkAt(strategy.address)).to.be.eq(timestamp);
    });

    it('should ask Keep3r if caller is valid keeper', async () => {
      await tendJob.work(strategy.address);

      expect(keep3r.isBondedKeeper).to.be.calledOnce;
    });

    it('should revert if caller is not valid keeper', async () => {
      keep3r.isBondedKeeper.returns(false);
      await expect(tendJob.work(strategy.address)).to.be.revertedWith('KeeperNotValid()');
    });

    it('should call tend on v2Keeper with strategy', async () => {
      await tendJob.work(strategy.address);

      expect(v2Keeper.tend).to.be.calledOnceWith(strategy.address);
    });

    it('should call bondedPayment on Keep3rV2', async () => {
      await tendJob.work(strategy.address);

      expect(keep3r.bondedPayment).to.be.calledOnce;
    });

    it('should validate onlyEOA', async () => {
      const proxyFactory = await smock.mock<V2JobProxyForTest__factory>('V2JobProxyForTest');
      const proxy: MockContract<V2JobProxyForTest> = await proxyFactory.deploy(constants.ZERO_ADDRESS);

      // await tendJob.setVariable('onlyEOA', true) // bug in smock overwriting nearby variables
      await expect(proxy.callWork(tendJob.address, strategy.address)).not.to.be.reverted;

      await tendJob.connect(governor).setOnlyEOA(true);
      await expect(proxy.callWork(tendJob.address, strategy.address)).to.be.revertedWith('OnlyEOA()');
    });

    it('should revert if not workable', async () => {
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;
      await tendJob.setVariable('lastWorkAt', { [strategy.address]: timestamp });
      await tendJob.setVariable('workCooldown', 10);

      await expect(tendJob.work(strategy.address)).to.be.revertedWith('StrategyNotWorkable()');
    });

    it('should query keeper requirements on Keep3rV1', async () => {
      const MIN_BOND = 50_000;
      const BOND = wallet.generateRandomAddress();
      const EARNED = bn.toUnit(10);
      const AGE = 1_000;

      keep3r.isBondedKeeper.reset();
      keep3r.isBondedKeeper.returns(true);

      await tendJob.setVariable('requiredBond', BOND);
      await tendJob.setVariable('requiredMinBond', MIN_BOND);
      await tendJob.setVariable('requiredEarnings', EARNED);
      await tendJob.setVariable('requiredAge', AGE);

      await tendJob.work(strategy.address);
      expect(keep3r.isBondedKeeper).to.have.been.calledOnce;
    });
  });

  describe('forceWork', () => {
    behaviours.onlyGovernorOrMechanic(
      () => tendJob,
      'forceWork',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should query mechanicsRegistry with the caller', async () => {
      mechanicsRegistry.isMechanic.reset();
      mechanicsRegistry.isMechanic.returns(true);
      await tendJob.setVariable('governor', constants.ZERO_ADDRESS);

      await tendJob.connect(randomCaller).forceWork(randomAddress);

      expect(mechanicsRegistry.isMechanic).to.be.calledOnceWith(randomCaller.address);
    });

    it('should revert if caller is not governor or mechanic', async () => {
      mechanicsRegistry.isMechanic.returns(false);
      await tendJob.setVariable('governor', constants.ZERO_ADDRESS);

      await expect(tendJob.forceWork(randomAddress)).to.be.revertedWith('OnlyGovernorOrMechanic()');
    });

    it('should emit event', async () => {
      const tx = await tendJob.connect(governor).forceWork(randomAddress);

      await expect(tx).to.emit(tendJob, 'ForceWorked').withArgs(randomAddress);
    });
  });
});
