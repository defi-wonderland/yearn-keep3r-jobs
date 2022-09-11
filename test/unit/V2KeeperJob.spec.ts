import chai, { expect } from 'chai';
import { Wallet } from 'ethers';
import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { IMechanicsRegistry, IV2Keeper } from '@typechained';
import { V2KeeperJobForTest, V2KeeperJobForTest__factory } from '@typechained';
import { wallet, behaviours, evm } from '@utils';
import { ethers } from 'hardhat';
import * as common from './common';

chai.use(smock.matchers);

describe('V2KeeperJob', () => {
  let keep3rJob: MockContract<V2KeeperJobForTest>;
  let keep3rJobFactory: MockContractFactory<V2KeeperJobForTest__factory>;
  let randomAddress: string;

  let mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  let v2Keeper: FakeContract<IV2Keeper>;
  let governor: Wallet;
  let snapshotId: string;

  before(async () => {
    governor = await wallet.generateRandom();
    randomAddress = wallet.generateRandomAddress();
    keep3rJobFactory = await smock.mock<V2KeeperJobForTest__factory>('V2KeeperJobForTest');

    ({ mechanicsRegistry, v2Keeper } = await common.setupFakes());

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);

    keep3rJob = await keep3rJobFactory.connect(governor).deploy(
      governor.address, // address _governor
      mechanicsRegistry.address, // address _mechanicsRegistry,
      v2Keeper.address, // address _v2Keeper,
      0 // uint256 _workCooldown
    );
  });

  describe('strategies', () => {
    const strategyA = wallet.generateRandomAddress();
    const strategyB = wallet.generateRandomAddress();

    beforeEach(async () => {
      await keep3rJob.addStrategy(strategyA, 0);
      await keep3rJob.addStrategy(strategyB, 0);
    });

    it('should return an array of strategies', async () => {
      expect(await keep3rJob.strategies()).to.deep.eq([strategyA, strategyB]);
    });
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

  describe('_getCallCosts', () => {
    it('should return 0 when no requiredAmount', async () => {
      const callCost = await keep3rJob.internalGetCallCosts(randomAddress);

      expect(callCost).to.eq(0);
    });
  });

  describe('_workable', () => {
    const COOLDOWN = 100;
    const strategy = wallet.generateRandomAddress();
    const randomAddress = wallet.generateRandomAddress();
    let timestamp: number;

    beforeEach(async () => {
      await keep3rJob.addStrategy(strategy, 0);
      await keep3rJob.setVariable('workCooldown', COOLDOWN);
      timestamp = (await ethers.provider.getBlock('latest')).timestamp;
    });

    it('should revert if strategy unexistent', async () => {
      await expect(keep3rJob.internalWorkable(randomAddress)).to.be.revertedWith('StrategyNotAdded()');
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

  describe('addStrategy', () => {
    const REQUIRED_AMOUNT = 100;

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'addStrategy',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress, 0]
    );

    it('should not add a strategy twice', async () => {
      await keep3rJob.addStrategy(randomAddress, 0);
      await expect(keep3rJob.addStrategy(randomAddress, 0)).to.be.revertedWith('StrategyAlreadyAdded()');
    });

    it('should set required amount for strategy', async () => {
      await keep3rJob.addStrategy(randomAddress, REQUIRED_AMOUNT);

      expect(await keep3rJob.requiredAmount(randomAddress)).to.eq(REQUIRED_AMOUNT);
    });

    it('should emit event', async () => {
      const tx = await keep3rJob.addStrategy(randomAddress, REQUIRED_AMOUNT);

      await expect(tx).to.emit(keep3rJob, 'StrategyAdded').withArgs(randomAddress, REQUIRED_AMOUNT);
    });

    it('should add strategy to array', async () => {
      await keep3rJob.addStrategy(randomAddress, REQUIRED_AMOUNT);

      expect(await keep3rJob.strategies()).to.deep.eq([randomAddress]);
    });
  });

  describe('addStrategies[]', () => {
    const REQUIRED_AMOUNT = 100;
    const secondStrategy = wallet.generateRandomAddress();

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'addStrategies',
      () => [governor, mechanicsRegistry.wallet],
      () => [[randomAddress], [0]]
    );

    it('should revert if different lengths', async () => {
      await expect(keep3rJob.addStrategies([randomAddress, secondStrategy], [REQUIRED_AMOUNT])).be.revertedWith('WrongLengths()');
    });

    it('should not add a strategy twice', async () => {
      await expect(keep3rJob.addStrategies([randomAddress, randomAddress], [REQUIRED_AMOUNT, REQUIRED_AMOUNT])).to.be.revertedWith(
        'StrategyAlreadyAdded()'
      );
    });

    it('should set required amount for strategies', async () => {
      const OTHER_REQUIRED_AMOUNT = REQUIRED_AMOUNT + 1;
      await keep3rJob.addStrategies([randomAddress, secondStrategy], [REQUIRED_AMOUNT, OTHER_REQUIRED_AMOUNT]);

      expect(await keep3rJob.requiredAmount(randomAddress)).to.eq(REQUIRED_AMOUNT);
      expect(await keep3rJob.requiredAmount(secondStrategy)).to.eq(OTHER_REQUIRED_AMOUNT);
    });

    it('should emit events', async () => {
      const tx = await keep3rJob.addStrategies([randomAddress, secondStrategy], [REQUIRED_AMOUNT, REQUIRED_AMOUNT]);

      await expect(tx).to.emit(keep3rJob, 'StrategyAdded').withArgs(randomAddress, REQUIRED_AMOUNT);
      await expect(tx).to.emit(keep3rJob, 'StrategyAdded').withArgs(secondStrategy, REQUIRED_AMOUNT);
    });

    it('should add strategies to array', async () => {
      await keep3rJob.addStrategies([randomAddress, secondStrategy], [REQUIRED_AMOUNT, REQUIRED_AMOUNT]);

      expect(await keep3rJob.strategies()).to.deep.eq([randomAddress, secondStrategy]);
    });
  });

  describe('removeStrategy', () => {
    beforeEach(async () => {
      await keep3rJob.addStrategy(randomAddress, 0);
    });

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'removeStrategy',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress]
    );

    it('should not rm a strategy twice', async () => {
      await keep3rJob.removeStrategy(randomAddress);
      await expect(keep3rJob.removeStrategy(randomAddress)).to.be.revertedWith('StrategyNotAdded()');
    });

    it('should rm required amount for strategy', async () => {
      await keep3rJob.removeStrategy(randomAddress);

      expect(await keep3rJob.requiredAmount(randomAddress)).to.eq(0);
    });

    it('should emit event', async () => {
      const tx = await keep3rJob.removeStrategy(randomAddress);

      await expect(tx).to.emit(keep3rJob, 'StrategyRemoved').withArgs(randomAddress);
    });

    it('should rm strategy to array', async () => {
      await keep3rJob.removeStrategy(randomAddress);

      expect(await keep3rJob.strategies()).to.deep.eq([]);
    });
  });

  describe('updateRequiredAmount', () => {
    const NEW_REQUIRED_AMOUNT = 100;

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'updateRequiredAmount',
      () => [governor, mechanicsRegistry.wallet],
      () => [randomAddress, 0]
    );

    it('should revert if strategy is unexistent', async () => {
      await expect(keep3rJob.updateRequiredAmount(randomAddress, NEW_REQUIRED_AMOUNT)).to.be.revertedWith('StrategyNotAdded()');
    });

    it('should update required amount for strategy', async () => {
      await keep3rJob.connect(governor).addStrategy(randomAddress, 0);
      await keep3rJob.updateRequiredAmount(randomAddress, NEW_REQUIRED_AMOUNT);
      expect(await keep3rJob.requiredAmount(randomAddress)).to.eq(NEW_REQUIRED_AMOUNT);
    });

    it('should emit event', async () => {
      await keep3rJob.connect(governor).addStrategy(randomAddress, 0);
      const tx = await keep3rJob.updateRequiredAmount(randomAddress, NEW_REQUIRED_AMOUNT);
      await expect(tx).to.emit(keep3rJob, 'StrategyModified').withArgs(randomAddress, NEW_REQUIRED_AMOUNT);
    });
  });

  describe('updateRequiredAmounts[]', () => {
    const NEW_REQUIRED_AMOUNT = 100;
    const OTHER_REQUIRED_AMOUNT = 200;
    const secondStrategy = wallet.generateRandomAddress();

    beforeEach(async () => {
      await keep3rJob.addStrategies([randomAddress, secondStrategy], [0, 0]);
    });

    behaviours.onlyGovernorOrMechanic(
      () => keep3rJob,
      'updateRequiredAmounts',
      () => [governor, mechanicsRegistry.wallet],
      () => [[randomAddress], [0]]
    );

    it('should revert if arrays differ length', async () => {
      await expect(keep3rJob.updateRequiredAmounts([randomAddress, secondStrategy], [NEW_REQUIRED_AMOUNT])).to.be.revertedWith('WrongLengths()');
    });

    it('should update required amount for strategies', async () => {
      await keep3rJob.updateRequiredAmounts([randomAddress, secondStrategy], [NEW_REQUIRED_AMOUNT, OTHER_REQUIRED_AMOUNT]);
      expect(await keep3rJob.requiredAmount(randomAddress)).to.eq(NEW_REQUIRED_AMOUNT);
      expect(await keep3rJob.requiredAmount(secondStrategy)).to.eq(OTHER_REQUIRED_AMOUNT);
    });
  });

  describe('setV2Keeper', () => {
    beforeEach(async () => {
      randomAddress = wallet.generateRandomAddress();
    });

    behaviours.onlyGovernor(
      () => keep3rJob,
      'setV2Keeper',
      () => [governor],
      () => [randomAddress]
    );

    it('should set new v2Keeper address', async () => {
      await keep3rJob.setV2Keeper(randomAddress);
      expect(await keep3rJob.v2Keeper()).to.eq(randomAddress);
    });
  });
});
