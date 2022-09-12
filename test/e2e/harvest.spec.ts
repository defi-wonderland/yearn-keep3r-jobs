import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { StealthRelayer, UniswapV3Pool, StealthVault } from '@eth-sdk-types';
import { HarvestV2Keep3rStealthJob, IBaseStrategy, IKeep3rV2 } from '@typechained';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import * as common from './common';
import { ethers } from 'hardhat';
import { evm, constants } from '@utils';
import { expect } from 'chai';
import { getNodeUrl } from 'utils/env';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const DELTA = '15000000000000000'; // 0.015 KP3R
const BASE_FEE = 50e9; // 50 gwei
const BASE = 10_000;

const workableStrategies = [
  {
    name: 'StargateUSDTStaker',
    address: '0xead650e673f497cdbe365f7a855273bbb468e454',
    block: 15495338,
    callData: '0x36df7ea5000000000000000000000000ead650e673f497cdbe365f7a855273bbb468e454',
    txHash: '0x098aa8d6eed8fafaa63dde08cf012665b5506c4e0ac4f3ab208697175c9ae6fc',
  },
  {
    name: 'StargateUSDCStaker',
    address: '0x7c85c0a8e2a45eeff98a10b6037f70daf714b7cf',
    block: 15514011,
    callData: '0x36df7ea50000000000000000000000007c85c0a8e2a45eeff98a10b6037f70daf714b7cf',
    txHash: '0x5026697c0516aabb8f9790669fa983015aa1169dc8c9bb6c478f9e7d168b8855',
  },
  // {
  //   name: 'STRATEGY_NAME',
  //   address: 'STRATEGY_ADDRESS',
  //   block: BLOCK_NUMBER,
  //   callData: 'CALL_DATA',
  //   txHash: 'TX_HASH'
  // },
];

describe('Harvest @skip-on-coverage', () => {
  let governor: JsonRpcSigner;
  let signer: SignerWithAddress;
  let keeper: JsonRpcSigner;
  let bondedKeeper: JsonRpcSigner;
  let pool: UniswapV3Pool;
  let harvestJob: HarvestV2Keep3rStealthJob;
  let stealthRelayer: StealthRelayer;
  let keep3rV2: IKeep3rV2;
  let strategy: IBaseStrategy;

  workableStrategies.forEach((str) => {
    describe(str.name, () => {
      let stealthHash: string;
      let blockNumber: number;
      let quote: number;

      beforeEach(async () => {
        await evm.reset({
          jsonRpcUrl: getNodeUrl('ethereum'),
          blockNumber: str.block - 1,
        });

        [signer] = await ethers.getSigners();
        const sdk = getMainnetSdk(signer);
        ({ harvestJob, keep3rV2, keeper, governor, bondedKeeper } = await common.setupHarvestJob());
        stealthRelayer = sdk.stealthRelayer;

        pool = sdk.uniswapV3Pool.attach(constants.KP3R_WETH_V3_POOL_ADDRESS);

        strategy = (await ethers.getContractAt('IBaseStrategy', str.address)) as IBaseStrategy;

        await harvestJob.connect(governor).addStrategy(strategy.address, 0);

        // quote calculation
        const twapTime = 600;
        const [ticks] = await pool.observe([twapTime, 0]);
        quote = Math.floor(1.0001 ** ticks[0].sub(ticks[1]).div(twapTime).toNumber() * BASE);

        stealthHash = ethers.utils.solidityKeccak256(['string'], ['random-secret-hash']);
      });

      it('should be worked', async () => {
        await common.initializeStateVariables(keep3rV2, keeper._address, harvestJob.address);
        blockNumber = (await ethers.provider.getBlock('latest')).number;

        const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await stealthRelayer.connect(keeper).executeAndPay(
          harvestJob.address,
          str.callData,
          stealthHash,
          blockNumber + 1,
          0, // _payment
          { maxPriorityFeePerGas: 1e6 }
        );

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;
        const baseFee = txReceipt.effectiveGasPrice;

        const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

        expect(workCompleted).to.be.closeTo(expectedReward.mul(112).div(100), DELTA);
        await expect(tx).to.emit(strategy, 'Harvested');
        await expect(tx).to.emit(harvestJob, 'KeeperWorked');
      });

      it('should boost rewards for bonded keepers', async () => {
        await common.initializeStateVariables(keep3rV2, bondedKeeper._address, harvestJob.address);
        blockNumber = (await ethers.provider.getBlock('latest')).number;

        const prevWorkCompleted = await keep3rV2.workCompleted(bondedKeeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await stealthRelayer.connect(bondedKeeper).executeAndPay(
          harvestJob.address,
          str.callData,
          stealthHash,
          blockNumber + 1,
          0, // _payment
          { maxPriorityFeePerGas: 1e6 }
        );

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(bondedKeeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;
        const baseFee = txReceipt.effectiveGasPrice;

        const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(120).div(100), DELTA);
      });

      // @dev Testing dynamic baseFee functionality of Keep3rHelper 0xedde080e28eb53532bd1804de51bd9cd5cadf0d4
      it('should boost rewards when baseFee is below threshold', async () => {
        const BASE_FEE = 5e9;
        const MIN_BASE_FEE = 15e9;
        await common.initializeStateVariables(keep3rV2, bondedKeeper._address, harvestJob.address);
        blockNumber = (await ethers.provider.getBlock('latest')).number;

        const prevWorkCompleted = await keep3rV2.workCompleted(bondedKeeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await stealthRelayer.connect(bondedKeeper).executeAndPay(
          harvestJob.address,
          str.callData,
          stealthHash,
          blockNumber + 1,
          0, // _payment
          { maxPriorityFeePerGas: 1e6 }
        );

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(bondedKeeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;

        // @notice uses MIN_BASE_FEE for calculating reward
        const expectedReward = gasUsed.mul(MIN_BASE_FEE).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(120).div(100), DELTA);
      });
    });
  });
});
