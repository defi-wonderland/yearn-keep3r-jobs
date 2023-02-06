import chai, { expect } from 'chai';
import { Wallet } from 'ethers';
import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { IMechanicsRegistry, IVaultRegistry, IKeeperWrapper } from '@typechained';
import { PublicKeeperJobForTest, PublicKeeperJobForTest__factory } from '@typechained';
import { wallet, behaviours, evm } from '@utils';
import { ethers } from 'hardhat';
import * as common from './common';

chai.use(smock.matchers);

describe('PublicKeeperJob', () => {
  let keep3rJob: MockContract<PublicKeeperJobForTest>;
  let keep3rJobFactory: MockContractFactory<PublicKeeperJobForTest__factory>;
  let randomAddress: string;

  let mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  let vaultRegistry: FakeContract<IVaultRegistry>;
  let publicKeeper: FakeContract<IKeeperWrapper>;
  let governor: Wallet;
  let snapshotId: string;

  before(async () => {
    governor = await wallet.generateRandom();
    randomAddress = wallet.generateRandomAddress();
    keep3rJobFactory = await smock.mock<PublicKeeperJobForTest__factory>('PublicKeeperJobForTest');

    ({ mechanicsRegistry, publicKeeper, vaultRegistry } = await common.setupFakes());

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);

    keep3rJob = await keep3rJobFactory.connect(governor).deploy(
      governor.address, // address _governor
      publicKeeper.address, // address _publicKeeper,
      mechanicsRegistry.address, // address _mechanicsRegistry,
      vaultRegistry.address, // address _vaultRegistry,
      0 // uint256 _workCooldown
    );
  });

  describe('setWorkCooldown', () => {
    const random = Math.floor(Math.random() * 10_000);

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'setWorkCooldown',
      () => [governor, mechanicsRegistry.wallet],
      () => [random]
    );

    it('should set new workCooldown', async () => {
      await keep3rJob.setWorkCooldown(random);
      expect(await keep3rJob.workCooldown()).to.eq(random);
    });

    it('should revert if 0', async () => {
      await expect(keep3rJob.setWorkCooldown(0)).to.be.revertedWith('ZeroCooldown()');
    });
  });

  describe('setMechanicsRegistry', () => {
    behaviours.onlyGovernor(
      () => keep3rJob,
      'setMechanicsRegistry',
      () => [governor],
      () => [randomAddress]
    );

    it('should set new mechanicsRegistry', async () => {
      const random = wallet.generateRandomAddress();
      await keep3rJob.setMechanicsRegistry(random);
      expect(await keep3rJob.mechanicsRegistry()).to.eq(random);
    });
  });

  describe('_workable', () => {
    const COOLDOWN = 100;
    const strategy = wallet.generateRandomAddress();
    let timestamp: number;

    beforeEach(async () => {
      await keep3rJob.setVariable('workCooldown', COOLDOWN);
      timestamp = (await ethers.provider.getBlock('latest')).timestamp;
    });

    it('should return true if cooldown is 0', async () => {
      await keep3rJob.setVariable('workCooldown', 0);
      expect(await keep3rJob.internalWorkable(strategy)).to.be.true;
    });

    it('should return false if cooldown has not expired', async () => {
      await keep3rJob.setVariable('lastWorkAt', { [strategy]: timestamp + 1 - COOLDOWN });
      expect(await keep3rJob.internalWorkable(strategy)).to.be.false;
    });

    it('should return true if cooldown has expired', async () => {
      await keep3rJob.setVariable('lastWorkAt', { [strategy]: timestamp - 1 - COOLDOWN });
      expect(await keep3rJob.internalWorkable(strategy)).to.be.true;
    });
  });

  describe('ignoreStrategy', () => {
    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'ignoreStrategy',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should not add a strategy twice', async () => {
      await keep3rJob.ignoreStrategy(randomAddress);
      await expect(keep3rJob.ignoreStrategy(randomAddress)).to.be.revertedWith('StrategyAlreadyIgnored()');
    });

    it('should emit event', async () => {
      const tx = await keep3rJob.ignoreStrategy(randomAddress);

      await expect(tx).to.emit(keep3rJob, 'StrategyIgnored').withArgs(randomAddress);
    });
  });

  describe('acknowledgeStrategy', () => {
    beforeEach(async () => {
      await keep3rJob.ignoreStrategy(randomAddress);
    });

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'acknowledgeStrategy',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should not rm a strategy twice', async () => {
      await keep3rJob.acknowledgeStrategy(randomAddress);
      await expect(keep3rJob.acknowledgeStrategy(randomAddress)).to.be.revertedWith('StrategyNotIgnored()');
    });

    it('should emit event', async () => {
      const tx = await keep3rJob.acknowledgeStrategy(randomAddress);

      await expect(tx).to.emit(keep3rJob, 'StrategyAcknowledged').withArgs(randomAddress);
    });
  });

  describe('setPublicKeeper', () => {
    beforeEach(async () => {
      randomAddress = wallet.generateRandomAddress();
    });

    behaviours.onlyGovernor(
      () => keep3rJob,
      'setPublicKeeper',
      () => [governor],
      () => [randomAddress]
    );

    it('should set new publicKeeper address', async () => {
      await keep3rJob.setPublicKeeper(randomAddress);
      expect(await keep3rJob.publicKeeper()).to.eq(randomAddress);
    });
  });
});
