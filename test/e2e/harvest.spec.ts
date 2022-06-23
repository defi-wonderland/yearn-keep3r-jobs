import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { StealthRelayer, UniswapV3Pool } from '@eth-sdk-types';
import { HarvestV2Keep3rStealthJob, IBaseStrategy, IKeep3rV2 } from '@typechained';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import * as common from './common';
import { ethers } from 'hardhat';
import { evm, constants } from '@utils';
import { expect } from 'chai';
import { getNodeUrl } from 'utils/env';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const workableStrategies = [
  {
    name: 'StrategyConvexstETH',
    address: '0x6c0496fc55eb4089f1cf91a4344a2d56face51e3',
    block: 14927777,
    callData: '0x36df7ea50000000000000000000000006c0496fc55eb4089f1cf91a4344a2d56face51e3',
    txHash: '0x1711e198fe34acfd80b97e9f9d1f5f4c0f1cd6c1e118c2be38d6fe191427dac8',
  },
  {
    name: 'StrategyConvexIronBank',
    address: '0xf0aaba6bb8e6bae83ea984bc4b7dcf0ff54a8fef',
    block: 14922013,
    callData: '0x36df7ea5000000000000000000000000f0aaba6bb8e6bae83ea984bc4b7dcf0ff54a8fef',
    txHash: '0x33034d480b5e5aa971f4a38e2c6b3e75e071ec5362c1de0dea4af91c070d912b',
  },
  {
    name: 'RouterStrategy030',
    address: '0x3d6532c589a11117a4494d9725bb8518c731f1be',
    block: 14915491,
    callData: '0x36df7ea50000000000000000000000003d6532c589a11117a4494d9725bb8518c731f1be',
    txHash: '0xf197eeff8a6dbfb66dbe94292dcbf315c670e09283a2426c5da5e5577b439c6a',
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
  let pool: UniswapV3Pool;
  let harvestJob: HarvestV2Keep3rStealthJob;
  let stealthRelayer: StealthRelayer;
  let keep3rV2: IKeep3rV2;
  let strategy: IBaseStrategy;

  workableStrategies.forEach((str) => {
    describe(str.name, () => {
      beforeEach(async () => {
        await evm.reset({
          jsonRpcUrl: getNodeUrl('ethereum'),
          blockNumber: str.block - 1,
        });

        [signer] = await ethers.getSigners();
        const sdk = getMainnetSdk(signer);
        ({ harvestJob, keep3rV2, keeper, governor } = await common.setupHarvestJob());
        stealthRelayer = sdk.stealthRelayer;
        pool = sdk.uniswapV3Pool.attach(constants.KP3R_WETH_V3_POOL_ADDRESS);

        strategy = (await ethers.getContractAt('IBaseStrategy', str.address)) as IBaseStrategy;

        await harvestJob.connect(governor).addStrategy(strategy.address, 0);
      });

      describe('strategy', () => {
        it('should be worked', async () => {
          const BASE = 10_000;
          const blockNumber = (await ethers.provider.getBlock('latest')).number;
          const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

          // quote calculation
          const twapTime = 120;
          const [ticks] = await pool.observe([twapTime, 0]);
          const quote = Math.floor(1.0001 ** ticks[0].sub(ticks[1]).div(twapTime).toNumber() * BASE);

          const stealthHash = ethers.utils.solidityKeccak256(['string'], ['random-secret-hash']);

          const tx: TransactionResponse = await stealthRelayer.connect(keeper).executeAndPay(
            harvestJob.address,
            str.callData,
            stealthHash,
            blockNumber + 1,
            0 // _payment
          );

          const txReceipt = await tx.wait();
          const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
          const gasUsed = txReceipt.gasUsed;
          const baseFee = txReceipt.effectiveGasPrice;
          const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

          expect(workCompleted).to.be.gt(expectedReward.mul(100).div(100));
          expect(workCompleted).to.be.lt(expectedReward.mul(120).div(100));
          expect(tx).to.emit(strategy, 'Harvested');
          expect(tx).to.emit(harvestJob, 'KeeperWorked');
        });
      });
    });
  });
});
