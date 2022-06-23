import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { UniswapV3Pool } from '@eth-sdk-types';
import { TendV2Keep3rJob, IBaseStrategy, IKeep3rV2 } from '@typechained';
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
    name: 'StrategyMakerV2_ETH-C',
    address: '0xb698f815918e0a11cf802184f36f02cd4602ebd4',
    block: 14067956,
    txHash: '0xed54c125529ec0179d93342ffa61bc47dceda7a3a4fb680389d53c05373e4db3',
  },
  {
    name: 'StrategyMakerV2_YFI-A',
    address: '0xbc27c4873d0dde214387ce5a838dc78857633ea2',
    block: 14054735,
    txHash: '0xfefd14eb59dbcaea47f97b99ca96b37fc02ceaceab97ef3949ee35dadb708a6d',
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
  let pool: UniswapV3Pool;
  let tendJob: TendV2Keep3rJob;
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
        ({ tendJob, keep3rV2, keeper, governor } = await common.setupTendJob());
        pool = sdk.uniswapV3Pool.attach(constants.KP3R_WETH_V3_POOL_ADDRESS);

        strategy = (await ethers.getContractAt('IBaseStrategy', str.address)) as IBaseStrategy;

        await tendJob.connect(governor).addStrategy(strategy.address, 0);
      });

      describe('strategy', () => {
        it('should be worked', async () => {
          const BASE = 10_000;
          const prevWorkCompleted = await keep3rV2.workCompleted(keeper._address);

          // quote calculation
          const twapTime = 120;
          const [ticks] = await pool.observe([twapTime, 0]);
          const quote = Math.floor(1.0001 ** ticks[0].sub(ticks[1]).div(twapTime).toNumber() * BASE);

          const tx: TransactionResponse = await tendJob.connect(keeper).work(str.address);

          const txReceipt = await tx.wait();
          const workCompleted = (await keep3rV2.workCompleted(keeper._address)).sub(prevWorkCompleted);
          const gasUsed = txReceipt.gasUsed;
          const baseFee = txReceipt.effectiveGasPrice;
          const expectedReward = gasUsed.mul(baseFee).mul(quote).div(BASE);

          expect(workCompleted).to.be.gt(0);
          // NOTE: previous version of Keep3rV2 had a payment calculation bug
          // expect(workCompleted).to.be.gt(expectedReward.mul(100).div(100));
          // expect(workCompleted).to.be.lt(expectedReward.mul(120).div(100));
          expect(tx).to.emit(tendJob, 'KeeperWorked');
        });
      });
    });
  });
});
