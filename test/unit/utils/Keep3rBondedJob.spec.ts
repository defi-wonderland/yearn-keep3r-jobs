import { MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Keep3rBondedJobForTest, Keep3rBondedJobForTest__factory } from '@typechained';
import { wallet } from '@utils';
import { onlyGovernor } from '@utils/behaviours';
import { toUnit } from '@utils/bn';
import { expect } from 'chai';
import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

describe('Keep3rBondedJob', () => {
  let governor: SignerWithAddress;
  let jobFactory: MockContractFactory<Keep3rBondedJobForTest__factory>;
  let job: MockContract<Keep3rBondedJobForTest>;

  const defaultRequiredMinBond = toUnit(50);
  const requiredMinBond = toUnit(1);
  const requiredEarnings = toUnit(2);
  const requiredAge = toUnit(3);
  const defaultRequiredBond = '0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44';

  before(async () => {
    [, governor] = await ethers.getSigners();
    jobFactory = await smock.mock<Keep3rBondedJobForTest__factory>('Keep3rBondedJobForTest');
  });

  beforeEach(async () => {
    job = await jobFactory.deploy(governor.address);
  });

  describe('setKeep3rRequirements', () => {
    const random = wallet.generateRandomAddress();

    it('should set the keep3r', async () => {
      await job.connect(governor).setKeep3r(random);
      expect(await job.keep3r()).to.equal(random);
    });

    it('should emit event', async () => {
      await expect(job.connect(governor).setKeep3r(random)).to.emit(job, 'Keep3rSet').withArgs(random);
    });
  });

  describe('default values', () => {
    it('should return the default address for requiredBond', async () => {
      expect(await job.requiredBond()).to.equal(defaultRequiredBond);
    });

    it('should return the default amount for requiredMinBond', async () => {
      expect(await job.requiredMinBond()).to.equal(defaultRequiredMinBond);
    });

    it('should return the default value for requiredEarning', async () => {
      expect(await job.requiredEarnings()).to.equal(0);
    });

    it('should return the default value for requiredAge', async () => {
      expect(await job.requiredAge()).to.equal(0);
    });
  });

  describe('setKeep3rRequirements', () => {
    let newRequiredBond = wallet.generateRandomAddress();
    let newRequiredMinBond = requiredMinBond.add(1);
    let newRequiredEarnings = requiredEarnings.add(1);
    let newRequiredAge = requiredAge.add(1);

    onlyGovernor(
      () => job,
      'setKeep3rRequirements',
      () => governor,
      [newRequiredBond, newRequiredMinBond, newRequiredEarnings, newRequiredAge]
    );

    context('after calling the function', () => {
      let tx: ContractTransaction;

      beforeEach(async () => {
        tx = await job.connect(governor).setKeep3rRequirements(newRequiredBond, newRequiredMinBond, newRequiredEarnings, newRequiredAge);
      });

      it('should set the required bond', async () => {
        expect(await job.requiredBond()).to.equal(newRequiredBond);
      });

      it('should set the required minimum bond', async () => {
        expect(await job.requiredMinBond()).to.equal(newRequiredMinBond);
      });

      it('should set the required earnings', async () => {
        expect(await job.requiredEarnings()).to.equal(newRequiredEarnings);
      });

      it('should set the required age', async () => {
        expect(await job.requiredAge()).to.equal(newRequiredAge);
      });

      it('should emit event', async () => {
        await expect(tx)
          .to.emit(job, 'Keep3rRequirementsSet')
          .withArgs(newRequiredBond, newRequiredMinBond, newRequiredEarnings, newRequiredAge);
      });
    });
  });
});
