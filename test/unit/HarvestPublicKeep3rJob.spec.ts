import chai, { expect } from 'chai';
import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import {
  IKeep3rV2,
  IVaultRegistry,
  IMechanicsRegistry,
  IKeeperWrapper,
  IBaseStrategy,
  ITokenVault,
  HarvestPublicKeep3rJob,
  HarvestPublicKeep3rJob__factory,
  HarvestPublicKeep3rJobForTest,
  HarvestPublicKeep3rJobForTest__factory,
} from '@typechained';
import { Wallet } from 'ethers';
import { wallet, behaviours, evm, constants } from '@utils';
import { ethers } from 'hardhat';
import * as common from './common';

chai.use(smock.matchers);

const COOLDOWN = 60;

describe('HarvestPublicKeep3rJob', () => {
  let harvestJob: MockContract<HarvestPublicKeep3rJobForTest>;
  let harvestJobFactory: MockContractFactory<HarvestPublicKeep3rJobForTest__factory>;
  let randomAddress: string;
  let vaultAddress: string;
  let governor: Wallet;
  let randomCaller: Wallet;
  let snapshotId: string;

  let keep3r: FakeContract<IKeep3rV2>;
  let vaultRegistry: FakeContract<IVaultRegistry>;
  let mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  let publicKeeper: FakeContract<IKeeperWrapper>;
  let strategy: FakeContract<IBaseStrategy>;
  let vaultFake: FakeContract<ITokenVault>;

  before(async () => {
    governor = await wallet.generateRandom();
    randomCaller = await wallet.generateRandom();
    randomAddress = wallet.generateRandomAddress();
    vaultAddress = wallet.generateRandomAddress();
    harvestJobFactory = await smock.mock<HarvestPublicKeep3rJobForTest__factory>('HarvestPublicKeep3rJobForTest');

    ({ vaultRegistry, mechanicsRegistry, strategy, keep3r, publicKeeper } = await common.setupFakes());

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);

    harvestJob = await harvestJobFactory.connect(governor).deploy(
      governor.address, // address _governor
      mechanicsRegistry.address, // address _mechanicsRegistry,
      publicKeeper.address, // address _publicKeeper,
      vaultRegistry.address, // address _vaultRegistry
      COOLDOWN, // uint256 _workCooldown
      keep3r.address // address _keep3r
    );

    strategy.vault.returns(vaultAddress);
    vaultFake = await smock.fake('ITokenVault', { address: vaultAddress });

    vaultRegistry.isVaultEndorsed.whenCalledWith(vaultAddress).returns(true);
    vaultFake.strategies.whenCalledWith(strategy.address).returns({
      performanceFee: 0,
      activation: 1,
      debtRatio: 0,
      minDebtPerHarvest: 0,
      maxDebtPerHarvest: 0,
      lastReport: 0,
      totalDebt: 0,
      totalGain: 0,
      totalLoss: 0,
    });
  });

  describe('constructor', () => {
    let deployed: MockContract<HarvestPublicKeep3rJob>;

    const GOVERNOR = wallet.generateRandomAddress();
    const VAULT_REGISTRY = wallet.generateRandomAddress();
    const MECHANICS_REGISTRY = wallet.generateRandomAddress();
    const PUBLIC_KEEPER = wallet.generateRandomAddress();
    const COOLDOWN = Math.floor(Math.random() * 100);
    const KEEP3R = wallet.generateRandomAddress();

    beforeEach(async () => {
      const factory = await smock.mock<HarvestPublicKeep3rJob__factory>('HarvestPublicKeep3rJob');
      deployed = await factory.connect(governor).deploy(GOVERNOR, MECHANICS_REGISTRY, PUBLIC_KEEPER, VAULT_REGISTRY, COOLDOWN, KEEP3R);
    });

    it('should set governor', async () => {
      expect(await deployed.governor()).to.eq(GOVERNOR);
    });

    it('should set mechanicsRegistry', async () => {
      expect(await deployed.mechanicsRegistry()).to.eq(MECHANICS_REGISTRY);
    });

    it('should set vaultRegistry', async () => {
      expect(await deployed.vaultRegistry()).to.eq(VAULT_REGISTRY);
    });

    it('should set publicKeeper', async () => {
      expect(await deployed.publicKeeper()).to.eq(PUBLIC_KEEPER);
    });

    it('should set workCooldown', async () => {
      expect(await deployed.workCooldown()).to.eq(COOLDOWN);
    });

    it('should set keep3r', async () => {
      expect(await deployed.keep3r()).to.eq(KEEP3R);
    });

    it('should emit events', async () => {
      const tx = deployed.deployTransaction;

      await expect(tx).to.emit(deployed, 'Keep3rSet').withArgs(KEEP3R);
    });
  });

  describe('workable', () => {
    let timestamp: number;
    beforeEach(async () => {
      strategy.harvestTrigger.reset();
      strategy.harvestTrigger.returns(true);

      timestamp = (await ethers.provider.getBlock('latest')).timestamp;
    });

    it('should revert if vault is not endorsed', async () => {
      vaultRegistry.isVaultEndorsed.whenCalledWith(vaultAddress).returns(false);
      await expect(harvestJob.workable(strategy.address)).to.be.revertedWith('InvalidStrategy()');
    });

    it('should revert if strategy is not activated', async () => {
      vaultFake.strategies.whenCalledWith(strategy.address).returns({
        performanceFee: 0,
        activation: 0,
        debtRatio: 0,
        minDebtPerHarvest: 0,
        maxDebtPerHarvest: 0,
        lastReport: 0,
        totalDebt: 0,
        totalGain: 0,
        totalLoss: 0,
      });

      await expect(harvestJob.workable(strategy.address)).to.be.revertedWith('InvalidStrategy()');
    });

    it('should revert if strategy is ignored', async () => {
      await harvestJob.connect(governor).internalIgnoreStrategy(strategy.address);

      await expect(harvestJob.workable(strategy.address)).to.be.revertedWith('InvalidStrategy()');
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

      it('should return strategy response', async () => {
        strategy.harvestTrigger.returns(true);
        expect(await harvestJob.workable(strategy.address)).to.be.true;
        strategy.harvestTrigger.returns(false);
        expect(await harvestJob.workable(strategy.address)).to.be.false;
      });
    });
  });

  describe('work', () => {
    beforeEach(async () => {
      keep3r.worked.reset();
      keep3r.isKeeper.reset();
      publicKeeper.harvest.reset();

      strategy.harvestTrigger.returns(true);
      keep3r.isKeeper.returns(true);
    });

    it('should set lastWorkAt', async () => {
      await harvestJob.work(strategy.address);
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;

      expect(await harvestJob.lastWorkAt(strategy.address)).to.be.eq(timestamp);
    });

    it('should ask Keep3r if caller is valid keeper', async () => {
      await harvestJob.work(strategy.address);

      expect(keep3r.isKeeper).to.be.calledOnce;
    });

    it('should revert if caller is not valid keeper', async () => {
      keep3r.isKeeper.returns(false);
      await expect(harvestJob.work(strategy.address)).to.be.revertedWith('KeeperNotValid()');
    });

    it('should call harvest on publicKeeper with strategy', async () => {
      await harvestJob.work(strategy.address);

      expect(publicKeeper.harvest).to.be.calledOnceWith(strategy.address);
    });

    it('should call worked on Keep3rV2', async () => {
      await harvestJob.work(strategy.address);

      expect(keep3r.worked).to.be.calledOnce;
    });

    it('should revert if not workable', async () => {
      const timestamp = (await ethers.provider.getBlock('latest')).timestamp;
      await harvestJob.setVariable('lastWorkAt', { [strategy.address]: timestamp });
      await harvestJob.setVariable('workCooldown', 10);

      await expect(harvestJob.work(strategy.address)).to.be.revertedWith('StrategyNotWorkable()');
    });
  });

  describe('forceWork', () => {
    behaviours.onlyGovernorOrMechanic(
      () => harvestJob,
      'forceWork',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should query mechanicsRegistry with the caller', async () => {
      mechanicsRegistry.isMechanic.reset();
      mechanicsRegistry.isMechanic.returns(true);
      await harvestJob.setVariable('governor', constants.ZERO_ADDRESS);

      await harvestJob.connect(randomCaller).forceWork(randomAddress);

      expect(mechanicsRegistry.isMechanic).to.be.calledOnceWith(randomCaller.address);
    });

    it('should revert if caller is not governor or mechanic', async () => {
      mechanicsRegistry.isMechanic.returns(false);
      await harvestJob.setVariable('governor', constants.ZERO_ADDRESS);

      await expect(harvestJob.forceWork(randomAddress)).to.be.revertedWith('OnlyGovernorOrMechanic()');
    });

    it('should emit event', async () => {
      const tx = await harvestJob.connect(governor).forceWork(randomAddress);

      await expect(tx).to.emit(harvestJob, 'ForceWorked').withArgs(randomAddress);
    });
  });
});
