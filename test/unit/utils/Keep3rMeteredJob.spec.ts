import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { IKeep3rHelper, Keep3rMeteredJobForTest, Keep3rMeteredJobForTest__factory } from '@typechained';
import { wallet } from '@utils';
import { onlyGovernor } from '@utils/behaviours';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Keep3rMeteredJob', () => {
  let governor: SignerWithAddress;
  let jobFactory: MockContractFactory<Keep3rMeteredJobForTest__factory>;
  let job: MockContract<Keep3rMeteredJobForTest>;
  let keep3rHelper: FakeContract<IKeep3rHelper>;
  let randomNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

  const BASE = 10000;

  before(async () => {
    [, governor] = await ethers.getSigners();
    keep3rHelper = await smock.fake('IKeep3rHelper', {
      address: '0xeDDe080E28Eb53532bD1804de51BD9Cd5cADF0d4',
    });
    jobFactory = await smock.mock<Keep3rMeteredJobForTest__factory>('Keep3rMeteredJobForTest');
  });

  beforeEach(async () => {
    job = await jobFactory.deploy(governor.address);
  });

  describe('default values', () => {
    it('should return the default address for keep3rHelper', async () => {
      expect(await job.callStatic.keep3rHelper()).to.equal(keep3rHelper.address);
    });

    it('should return the default BASE', async () => {
      expect(await job.BASE()).to.equal(BASE);
    });
  });

  describe('setKeep3rHelper', () => {
    const random = wallet.generateRandomAddress();

    onlyGovernor(
      () => job,
      'setKeep3rHelper',
      () => governor,
      [random]
    );

    it('should set the keep3rHelper', async () => {
      await job.connect(governor).setKeep3rHelper(random);
      expect(await job.callStatic.keep3rHelper()).to.equal(random);
    });

    it('should emit event', async () => {
      await expect(job.connect(governor).setKeep3rHelper(random)).to.emit(job, 'Keep3rHelperSet').withArgs(random);
    });
  });

  describe('setGasMultiplier', () => {
    onlyGovernor(
      () => job,
      'setGasMultiplier',
      () => governor,
      [randomNumber]
    );

    it('should set the gasMultiplier', async () => {
      await job.connect(governor).setGasMultiplier(randomNumber);
      expect(await job.gasMultiplier()).to.equal(randomNumber);
    });

    it('should emit event', async () => {
      await expect(job.connect(governor).setGasMultiplier(randomNumber)).to.emit(job, 'GasMultiplierSet').withArgs(randomNumber);
    });

    it('should revert if max reached', async () => {
      const maxMultiplier = await job.maxMultiplier();
      await expect(job.connect(governor).setGasMultiplier(maxMultiplier)).not.to.be.reverted;
      await expect(job.connect(governor).setGasMultiplier(maxMultiplier.add(1))).to.be.revertedWith('MaxMultiplier()');
    });
  });

  describe('setMaxMultiplier', () => {
    onlyGovernor(
      () => job,
      'setMaxMultiplier',
      () => governor,
      [randomNumber]
    );

    it('should set the setMaxMultiplier', async () => {
      await job.connect(governor).setMaxMultiplier(randomNumber);
      expect(await job.maxMultiplier()).to.equal(randomNumber);
    });

    it('should emit event', async () => {
      await expect(job.connect(governor).setMaxMultiplier(randomNumber)).to.emit(job, 'MaxMultiplierSet').withArgs(randomNumber);
    });
  });

  describe('setGasBonus', () => {
    onlyGovernor(
      () => job,
      'setGasBonus',
      () => governor,
      [randomNumber]
    );

    it('should set the gasBonus', async () => {
      await job.connect(governor).setGasBonus(randomNumber);
      expect(await job.gasBonus()).to.equal(randomNumber);
    });

    it('should emit event', async () => {
      await expect(job.connect(governor).setGasBonus(randomNumber)).to.emit(job, 'GasBonusSet').withArgs(randomNumber);
    });
  });

  describe('_calculateCredits', () => {
    it('should query keep3rHelper', async () => {
      keep3rHelper.getRewardAmount.returns(10_000);

      const INITIAL_GAS = 30e6;

      await job.internalCalculateCredits(INITIAL_GAS, {
        gasLimit: 10e6,
      });

      expect(keep3rHelper.getRewardAmount).to.have.been.calledOnce;
    });
  });
});
