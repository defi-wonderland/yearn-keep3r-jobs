import { ethers } from 'hardhat';
import { FakeContract, smock } from '@defi-wonderland/smock';
import {
  IKeep3rV2,
  IKeep3rHelper,
  IStealthRelayer,
  IBaseStrategy,
  IMechanicsRegistry,
  IV2Keeper,
  IKeeperWrapper,
  IVaultRegistry,
} from '@typechained';
import { KEEP3R_V2, KEEP3R_V2_HELPER } from '@utils/constants';

export async function setupFakes(): Promise<{
  mechanicsRegistry: FakeContract<IMechanicsRegistry>;
  stealthRelayer: FakeContract<IStealthRelayer>;
  vaultRegistry: FakeContract<IVaultRegistry>;
  v2Keeper: FakeContract<IV2Keeper>;
  publicKeeper: FakeContract<IKeeperWrapper>;
  strategy: FakeContract<IBaseStrategy>;
  keep3r: FakeContract<IKeep3rV2>;
  keep3rHelper: FakeContract<IKeep3rHelper>;
}> {
  // NOTE: this deployment avoids smock forgetting about fakes
  await (await ethers.getContractFactory('DumbContract')).deploy();

  const stealthRelayer = await smock.fake<IStealthRelayer>('IStealthRelayer');
  const strategy = await smock.fake<IBaseStrategy>('IBaseStrategy');
  const vaultRegistry = await smock.fake<IVaultRegistry>('IVaultRegistry');
  const mechanicsRegistry = await smock.fake<IMechanicsRegistry>('IMechanicsRegistry');
  const v2Keeper = await smock.fake<IV2Keeper>('IV2Keeper');
  const publicKeeper = await smock.fake<IKeeperWrapper>('IKeeperWrapper');

  const keep3r = await smock.fake<IKeep3rV2>('IKeep3rV2', { address: KEEP3R_V2 });
  const keep3rHelper = await smock.fake<IKeep3rHelper>('IKeep3rHelper', { address: KEEP3R_V2_HELPER });
  keep3r.keep3rHelper.returns(keep3rHelper.address);

  return { keep3r, keep3rHelper, stealthRelayer, strategy, vaultRegistry, mechanicsRegistry, v2Keeper, publicKeeper };
}
