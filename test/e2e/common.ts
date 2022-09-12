import { JsonRpcSigner } from '@ethersproject/providers';
import {
  HarvestV2Keep3rStealthJob,
  HarvestV2Keep3rStealthJob__factory,
  TendV2Keep3rJob,
  TendV2Keep3rJob__factory,
  IStealthRelayer,
  IStealthVault,
  IV2Keeper,
  IKeep3rV2,
  IERC20,
} from '@typechained';
import { wallet, evm, constants } from '@utils';
import { toUnit } from '@utils/bn';
import { ethers } from 'hardhat';
import { BigNumberish } from 'ethers';

export async function activateKeeper(
  keep3rV2: IKeep3rV2,
  address: string,
  bonds: BigNumberish,
  stealthVault: boolean = false
): Promise<{
  keeper: JsonRpcSigner;
}> {
  const kp3rWhale = await wallet.impersonate(constants.KP3R_WHALE);
  const keeper = await wallet.impersonate(address);

  await wallet.setBalance({ account: kp3rWhale._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: keeper._address, balance: toUnit(1000) });

  const kp3rV1 = (await ethers.getContractAt('IERC20', constants.KP3R_V1_ADDRESS)) as IERC20;
  await kp3rV1.connect(kp3rWhale).transfer(keeper._address, bonds);

  await kp3rV1.connect(keeper).approve(keep3rV2.address, bonds);
  await keep3rV2.connect(keeper).bond(kp3rV1.address, bonds);
  await evm.advanceTimeAndBlock(1);
  await keep3rV2.connect(keeper).activate(kp3rV1.address);

  if (stealthVault) {
    const stealthVault = (await ethers.getContractAt('IStealthVault', constants.STEALTH_VAULT)) as IStealthVault;
    await stealthVault.connect(keeper).bond({ value: constants.ONE });
    await stealthVault.connect(keeper).enableStealthContract(constants.STEALTH_RELAYER);
  }

  return { keeper };
}

// @dev In order to avoid cold storage outliers, this fn initializes state variables inside Keep3r about job and keeper
export async function initializeStateVariables(keep3rV2: IKeep3rV2, keeper: string, job: string): Promise<void> {
  const jobWallet = await wallet.impersonate(job);
  await wallet.setBalance({ account: jobWallet._address, balance: toUnit(1000) });
  await keep3rV2.connect(jobWallet).bondedPayment(keeper, 420);
}

export async function setupHarvestJob(): Promise<{
  harvestJob: HarvestV2Keep3rStealthJob;
  keep3rV2: IKeep3rV2;
  v2Keeper: IV2Keeper;
  stealthRelayer: IStealthRelayer;
  governor: JsonRpcSigner;
  keeper: JsonRpcSigner;
  bondedKeeper: JsonRpcSigner;
}> {
  let harvestJob: HarvestV2Keep3rStealthJob;
  const harvestJobFactory = (await ethers.getContractFactory('HarvestV2Keep3rStealthJob')) as HarvestV2Keep3rStealthJob__factory;

  harvestJob = await harvestJobFactory.deploy(
    constants.V2_KEEPER_GOVERNOR,
    constants.MECHANICS_REGISTRY,
    constants.STEALTH_RELAYER,
    constants.V2_KEEPER,
    constants.HARVEST_COOLDOWN,
    constants.KEEP3R_V2,
    constants.KEEP3R_V2_HELPER,
    constants.BOND,
    constants.MIN_BOND,
    constants.EARNED,
    constants.AGE,
    constants.ONLY_EOA
  );

  const keep3rV2 = (await ethers.getContractAt('IKeep3rV2', constants.KEEP3R_V2)) as IKeep3rV2;

  const governor = await wallet.impersonate(constants.V2_KEEPER_GOVERNOR);
  const proxyGovernor = await wallet.impersonate(constants.KP3R_V1_PROXY_GOVERNANCE_ADDRESS);
  await wallet.setBalance({ account: governor._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: proxyGovernor._address, balance: toUnit(1000) });

  const v2Keeper = (await ethers.getContractAt('IV2Keeper', constants.V2_KEEPER)) as IV2Keeper;
  const stealthRelayer = (await ethers.getContractAt('IStealthRelayer', constants.STEALTH_RELAYER)) as IStealthRelayer;

  await keep3rV2.connect(proxyGovernor).setBondTime(0);

  const { keeper } = await activateKeeper(keep3rV2, wallet.generateRandomAddress(), constants.MIN_BOND, true);
  const { keeper: bondedKeeper } = await activateKeeper(keep3rV2, wallet.generateRandomAddress(), constants.MAX_BOND, true);

  // adds job to v2Keeper
  await v2Keeper.connect(governor).addJob(harvestJob.address);

  // adds job to stealthRelayer
  await stealthRelayer.connect(governor).addJob(harvestJob.address);

  // adds job to keep3rV2
  await keep3rV2.addJob(harvestJob.address);
  await keep3rV2.connect(proxyGovernor).forceLiquidityCreditsToJob(harvestJob.address, toUnit(10));

  return { harvestJob, keep3rV2, v2Keeper, stealthRelayer, governor, keeper, bondedKeeper };
}

export async function setupTendJob(): Promise<{
  tendJob: TendV2Keep3rJob;
  keep3rV2: IKeep3rV2;
  v2Keeper: IV2Keeper;
  governor: JsonRpcSigner;
  keeper: JsonRpcSigner;
  bondedKeeper: JsonRpcSigner;
}> {
  let tendJob: TendV2Keep3rJob;
  const tendJobFactory = (await ethers.getContractFactory('TendV2Keep3rJob')) as TendV2Keep3rJob__factory;

  tendJob = await tendJobFactory.deploy(
    constants.V2_KEEPER_GOVERNOR,
    constants.MECHANICS_REGISTRY,
    constants.V2_KEEPER,
    constants.TEND_COOLDOWN,
    constants.KEEP3R_V2,
    constants.KEEP3R_V2_HELPER,
    constants.BOND,
    constants.MIN_BOND,
    constants.EARNED,
    constants.AGE,
    constants.ONLY_EOA
  );
  const keep3rV2 = (await ethers.getContractAt('IKeep3rV2', constants.KEEP3R_V2)) as IKeep3rV2;

  const governor = await wallet.impersonate(constants.V2_KEEPER_GOVERNOR);
  const proxyGovernor = await wallet.impersonate(constants.KP3R_V1_PROXY_GOVERNANCE_ADDRESS);
  await wallet.setBalance({ account: governor._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: proxyGovernor._address, balance: toUnit(1000) });

  const v2Keeper = (await ethers.getContractAt('IV2Keeper', constants.V2_KEEPER)) as IV2Keeper;

  await keep3rV2.connect(proxyGovernor).setBondTime(0);

  const { keeper } = await activateKeeper(keep3rV2, wallet.generateRandomAddress(), constants.MIN_BOND);
  const { keeper: bondedKeeper } = await activateKeeper(keep3rV2, wallet.generateRandomAddress(), constants.MAX_BOND);

  // adds job to v2Keeper
  await v2Keeper.connect(governor).addJob(tendJob.address);

  // adds job to keep3rV2
  await keep3rV2.addJob(tendJob.address);
  await keep3rV2.connect(proxyGovernor).forceLiquidityCreditsToJob(tendJob.address, toUnit(10));

  // set previous keep3rHelper version addresses
  await tendJob.connect(governor).setKeep3rHelper(await keep3rV2.keep3rHelper());

  return { tendJob, keep3rV2, v2Keeper, governor, keeper, bondedKeeper };
}
