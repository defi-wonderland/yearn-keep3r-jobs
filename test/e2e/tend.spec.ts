import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { UniswapV3Pool, Keep3rV2Helper } from '@eth-sdk-types';
import { TendV2Keep3rJob, IBaseStrategy, IKeep3rV2 } from '@typechained';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import * as common from './common';
import { ethers } from 'hardhat';
import { evm, constants } from '@utils';
import { expect } from 'chai';
import { getNodeUrl } from 'utils/env';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const DELTA = '15000000000000000'; // 0.015 KP3R
const BASE_FEE = 3e9; // 15 gwei
const BASE = 10_000;

const workableStrategies = [
  {
    name: 'Strategy-Maker-lev-GUNIV3DAIUSDC-0.05%',
    address: '0x9e3aef1fb3de09b8c46247fa707277b7331406b5',
    block: 15235020,
    txHash: '0x62b2e8edd99f39cc5d8f370b2e6d9da53e4041611c09c1d614c5fddad0337073',
  },
  {
    name: 'Strategy-Maker-lev-GUNIV3DAIUSDC-0.05%',
    address: '0x9e3aef1fb3de09b8c46247fa707277b7331406b5',
    block: 15233447,
    txHash: '0x4e81ba677b2f48aa403824586a217953951e4525adaf0164358c7a2f3ccf289d',
  },
  // {
  //   name: 'STRATEGY_NAME',
  //   address: 'STRATEGY_ADDRESS',
  //   block: 14922013,
  //   txHash: 'TX_HASH',
  // },
];

describe('Tend @skip-on-coverage', () => {
  let governor: JsonRpcSigner;
  let signer: SignerWithAddress;
  let keeper: JsonRpcSigner;
  let bondedKeeper: JsonRpcSigner;
  let pool: UniswapV3Pool;
  let tendJob: TendV2Keep3rJob;
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
        ({ tendJob, keep3rV2, keeper, bondedKeeper, governor } = await common.setupTendJob());

        pool = sdk.uniswapV3Pool.attach(constants.KP3R_WETH_V3_POOL_ADDRESS);

        strategy = (await ethers.getContractAt('IBaseStrategy', str.address)) as IBaseStrategy;

        await tendJob.connect(governor).addStrategy(strategy.address, 0);

        // quote calculation
        const twapTime = 600;
        const [ticks] = await pool.observe([twapTime, 0]);
        quote = Math.floor(1.0001 ** ticks[0].sub(ticks[1]).div(twapTime).toNumber() * BASE);
      });

      it('should be worked', async () => {
        await common.initializeStateVariables(keep3rV2, keeper._address, tendJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await tendJob.connect(keeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;
        const baseFee = txReceipt.effectiveGasPrice;

        const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(0);
        expect(workCompleted).to.be.closeTo(expectedReward.mul(110).div(100), DELTA);
        await expect(tx).to.emit(tendJob, 'KeeperWorked');
      });

      it('should boost rewards for bonded keepers', async () => {
        await common.initializeStateVariables(keep3rV2, bondedKeeper._address, tendJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(bondedKeeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await tendJob.connect(bondedKeeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(bondedKeeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;
        const baseFee = txReceipt.effectiveGasPrice;

        const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(120).div(100), DELTA);
      });

      // @dev Not yet implemented in tested blocks
      it.skip('should boost rewards when baseFee is below threshold', async () => {
        const BASE_FEE = 1e9;
        const MIN_BASE_FEE = 15e9;

        await common.initializeStateVariables(keep3rV2, bondedKeeper._address, tendJob.address);

        const prevWorkCompleted = await keep3rV2.workCompleted(bondedKeeper._address);

        await evm.setBaseFee(BASE_FEE);
        const tx: TransactionResponse = await tendJob.connect(bondedKeeper).work(str.address, { maxPriorityFeePerGas: 1e6 });

        const txReceipt = await tx.wait();
        const workCompleted = (await keep3rV2.workCompleted(bondedKeeper._address)).sub(prevWorkCompleted);
        const gasUsed = txReceipt.gasUsed;

        const expectedReward = gasUsed.mul(MIN_BASE_FEE).mul(quote).div(BASE);

        expect(workCompleted).to.be.gt(expectedReward.mul(110).div(100));
        expect(workCompleted).to.be.closeTo(expectedReward.mul(120).div(100), DELTA);
      });
    });
  });
});
