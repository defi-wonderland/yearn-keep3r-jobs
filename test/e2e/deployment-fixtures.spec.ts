import { getContractFromFixture } from '@utils/contracts';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { ethers, deployments } from 'hardhat';
import { IKeep3rV2 } from '@typechained';
import { evm } from '@utils';
import { Contract } from 'ethers';
import { getNodeUrl } from 'utils/env';
import forkBlockNumber from './fork-block-numbers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('@skip-on-coverage Fixture', () => {
  let signer: SignerWithAddress;
  let keep3rV2: IKeep3rV2;
  let strategyJob: Contract;

  beforeEach(async () => {
    [signer] = await ethers.getSigners();
    const sdk = getMainnetSdk(signer);
    keep3rV2 = sdk.keep3rV2 as any as IKeep3rV2;

    await evm.reset({
      jsonRpcUrl: getNodeUrl('ethereum'),
      blockNumber: forkBlockNumber.ethereum,
    });
  });

  describe('deployments', () => {
    it('should deploy stealth harvest job', async () => {
      await deployments.fixture(['harvest-job']);
      strategyJob = (await getContractFromFixture('HarvestJob', 'HarvestV2Keep3rStealthJob')) as any as Contract;
      expect(await keep3rV2.jobOwner(strategyJob.address)).to.eq(signer.address);
    });
    it('should deploy public harvest job', async () => {
      await deployments.fixture(['public-harvest-job']);
      strategyJob = (await getContractFromFixture('PublicHarvestJob', 'HarvestPublicKeep3rJob')) as any as Contract;
      expect(await keep3rV2.jobOwner(strategyJob.address)).to.eq(signer.address);
    });
    it('should deploy tend job', async () => {
      await deployments.fixture(['tend-job']);
      strategyJob = (await getContractFromFixture('TendJob', 'TendV2Keep3rJob')) as any as Contract;
      expect(await keep3rV2.jobOwner(strategyJob.address)).to.eq(signer.address);
    });
  });
});
