import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { UniswapV3Pool } from '@eth-sdk-types';
import { HarvestPublicKeep3rJob, IBaseStrategy, IKeep3rV2 } from '@typechained';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import * as common from './common';
import { ethers } from 'hardhat';
import { evm, constants } from '@utils';
import { expect } from 'chai';
import { getNodeUrl } from 'utils/env';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const DELTA = '15000000000000000'; // 0.015 KP3R
const BASE_FEE = 10e9; // 10 gwei
const MIN_REWARDED_BASE_FEE = 17e9;
const BASE = 10_000;

const workableStrategies = [
  {
    name: 'StrategyCurveBoostedFactoryClonable',
    address: '0xaBec96AC9CdC6863446657431DD32F73445E80b1',
    block: 16469336,
  },
  // {
  //   name: 'STRATEGY_NAME',
  //   address: 'STRATEGY_ADDRESS',
  //   block: BLOCK_NUMBER,
  //   callData: 'CALL_DATA',
  //   txHash: 'TX_HASH'
  // },
];

describe('PublicHarvest @skip-on-coverage', () => {
  let signer: SignerWithAddress;
  let keeper: JsonRpcSigner;
  let bondedKeeper: JsonRpcSigner;
  let pool: UniswapV3Pool;
  let harvestJob: HarvestPublicKeep3rJob;
  let keep3rV2: IKeep3rV2;
  let strategy: IBaseStrategy;

  workableStrategies.forEach((str) => {
    describe(str.name, () => {
      let quote: number;

      beforeEach(async () => {
        await evm.reset({
          jsonRpcUrl: getNodeUrl('ethereum'),
          blockNumber: str.block - 1,
        });

        [signer] = await ethers.getSigners();
        const sdk = getMainnetSdk(signer);
        ({ harvestJob, keep3rV2, keeper, bondedKeeper } = await common.setupPublicHarvestJob());

        pool = sdk.uniswapV3Pool.attach(constants.KP3R_WETH_V3_POOL_ADDRESS);

        strategy = (await ethers.getContractAt('IBaseStrategy', str.address)) as IBaseStrategy;

        // quote calculation
        const twapTime = 600;
        const [ticks] = await pool.observe([twapTime, 0]);
        quote = Math.floor(1.0001 ** ticks[0].sub(ticks[1]).div(twapTime).toNumber() * BASE);
      });

      it('should be worked', async () => {
        await common.initializeStateVariables(keep3rV2, keeper._address, harvestJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await harvestJob.connect(keeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;

        const expectedReward = gasUsed.mul(MIN_REWARDED_BASE_FEE).mul(quote).div(BASE);

        expect(workCompleted).to.be.closeTo(expectedReward.mul(110).div(100), DELTA);
        await expect(tx).to.emit(strategy, 'Harvested');
        await expect(tx).to.emit(harvestJob, 'KeeperWorked');
      });

      it('should boost rewards for bonded keepers', async () => {
        await common.initializeStateVariables(keep3rV2, bondedKeeper._address, harvestJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(bondedKeeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await harvestJob.connect(bondedKeeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(bondedKeeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;

        const expectedReward = gasUsed.mul(MIN_REWARDED_BASE_FEE).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(120).div(100), DELTA);
      });

      // @dev Testing dynamic baseFee functionality of Keep3rHelper 0xedde080e28eb53532bd1804de51bd9cd5cadf0d4
      it('should boost rewards when baseFee is below threshold', async () => {
        const BASE_FEE = 5e9;
        await common.initializeStateVariables(keep3rV2, keeper._address, harvestJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await harvestJob.connect(keeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;

        // @notice uses MIN_BASE_FEE for calculating reward
        const expectedReward = gasUsed.mul(MIN_REWARDED_BASE_FEE).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(110).div(100), DELTA);
      });
    });
  });
});
