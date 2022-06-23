import { FakeContract, MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Keep3rMeteredStealthJobForTest, IStealthRelayer, Keep3rMeteredStealthJobForTest__factory } from '@typechained';
import { wallet, behaviours } from '@utils';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Keep3rMeteredStealthJob', () => {
  let governor: SignerWithAddress;
  let jobFactory: MockContractFactory<Keep3rMeteredStealthJobForTest__factory>;
  let job: MockContract<Keep3rMeteredStealthJobForTest>;
  let stealthRelayer: FakeContract<IStealthRelayer>;
  const randomAddress = wallet.generateRandomAddress();

  before(async () => {
    [, governor] = await ethers.getSigners();
    jobFactory = await smock.mock<Keep3rMeteredStealthJobForTest__factory>('Keep3rMeteredStealthJobForTest');
  });

  beforeEach(async () => {
    stealthRelayer = await smock.fake<IStealthRelayer>('IStealthRelayer');
    job = await jobFactory.connect(governor).deploy(stealthRelayer.address);
  });

  describe('setStealthRelayer', () => {
    behaviours.onlyGovernor(
      () => job,
      'setStealthRelayer',
      () => [governor],
      () => [randomAddress]
    );

    it('should set new stealthRelayer', async () => {
      await job.connect(governor).setStealthRelayer(randomAddress);
      expect(await job.stealthRelayer()).to.eq(randomAddress);
    });

    it('should emit event', async () => {
      const tx = await job.connect(governor).setStealthRelayer(randomAddress);
      await expect(tx).to.emit(job, 'StealthRelayerSet').withArgs(randomAddress);
    });
  });
});
