import { JsonRpcSigner } from '@ethersproject/providers';
import {
  HarvestV2Keep3rStealthJob,
  HarvestV2Keep3rStealthJob__factory,
  TendV2Keep3rJob,
  TendV2Keep3rJob__factory,
  IStealthRelayer,
  IV2Keeper,
  IKeep3rV2,
  IERC20,
} from '@typechained';
import { wallet, evm, constants } from '@utils';
import { toUnit } from '@utils/bn';
import { ethers } from 'hardhat';

export async function setupHarvestJob(): Promise<{
  harvestJob: HarvestV2Keep3rStealthJob;
  keep3rV2: IKeep3rV2;
  v2Keeper: IV2Keeper;
  stealthRelayer: IStealthRelayer;
  governor: JsonRpcSigner;
  keeper: JsonRpcSigner;
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
  const kp3rV1 = (await ethers.getContractAt('IERC20', constants.KP3R_V1_ADDRESS)) as IERC20;

  const keeper = await wallet.impersonate(constants.KEEPER_ADDRESS);
  const governor = await wallet.impersonate(constants.V2_KEEPER_GOVERNOR);
  const proxyGovernor = await wallet.impersonate(constants.KP3R_V1_PROXY_GOVERNANCE_ADDRESS);
  await wallet.setBalance({ account: keeper._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: governor._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: proxyGovernor._address, balance: toUnit(1000) });

  const v2Keeper = (await ethers.getContractAt('IV2Keeper', constants.V2_KEEPER)) as IV2Keeper;
  const stealthRelayer = (await ethers.getContractAt('IStealthRelayer', constants.STEALTH_RELAYER)) as IStealthRelayer;

  await kp3rV1.connect(keeper).approve(keep3rV2.address, constants.MIN_BOND);
  await keep3rV2.connect(proxyGovernor).setBondTime(0);
  await keep3rV2.connect(keeper).bond(constants.KP3R_V1_ADDRESS, constants.MIN_BOND);
  await evm.advanceTimeAndBlock(1);
  await keep3rV2.connect(keeper).activate(constants.KP3R_V1_ADDRESS);

  // adds job to v2Keeper
  await v2Keeper.connect(governor).addJob(harvestJob.address);

  // adds job to stealthRelayer
  await stealthRelayer.connect(governor).addJob(harvestJob.address);

  // adds job to keep3rV1
  await keep3rV2.addJob(harvestJob.address);
  await keep3rV2.connect(proxyGovernor).forceLiquidityCreditsToJob(harvestJob.address, toUnit(10));

  return { harvestJob, keep3rV2, v2Keeper, stealthRelayer, governor, keeper };
}

export async function setupTendJob(): Promise<{
  tendJob: TendV2Keep3rJob;
  keep3rV2: IKeep3rV2;
  v2Keeper: IV2Keeper;
  governor: JsonRpcSigner;
  keeper: JsonRpcSigner;
}> {
  let tendJob: TendV2Keep3rJob;
  const tendJobFactory = (await ethers.getContractFactory('TendV2Keep3rJob')) as TendV2Keep3rJob__factory;

  // NOTE: all on-chain tend txs are posterior to latest Keep3rV2 deployment, using previous version
  const KEEP3R = '0xdc02981c9c062d48a9bd54adbf51b816623dcc6e';

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
  const keep3rV2 = (await ethers.getContractAt('IKeep3rV2', KEEP3R)) as IKeep3rV2;
  const kp3rV1 = (await ethers.getContractAt('IERC20', constants.KP3R_V1_ADDRESS)) as IERC20;

  const keeper = await wallet.impersonate(constants.KEEPER_ADDRESS);
  const governor = await wallet.impersonate(constants.V2_KEEPER_GOVERNOR);
  const proxyGovernor = await wallet.impersonate(constants.KP3R_V1_PROXY_GOVERNANCE_ADDRESS);
  await wallet.setBalance({ account: keeper._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: governor._address, balance: toUnit(1000) });
  await wallet.setBalance({ account: proxyGovernor._address, balance: toUnit(1000) });

  const v2Keeper = (await ethers.getContractAt('IV2Keeper', constants.V2_KEEPER)) as IV2Keeper;

  await kp3rV1.connect(governor).transfer(keeper._address, constants.MIN_BOND);

  await kp3rV1.connect(keeper).approve(keep3rV2.address, constants.MIN_BOND);
  await keep3rV2.connect(proxyGovernor).setBondTime(0);
  await keep3rV2.connect(keeper).bond(constants.KP3R_V1_ADDRESS, constants.MIN_BOND);
  await evm.advanceTimeAndBlock(1);
  await keep3rV2.connect(keeper).activate(constants.KP3R_V1_ADDRESS);

  // adds job to v2Keeper
  await v2Keeper.connect(governor).addJob(tendJob.address);

  // adds job to keep3rV1
  await keep3rV2.addJob(tendJob.address);
  await keep3rV2.connect(proxyGovernor).forceLiquidityCreditsToJob(tendJob.address, toUnit(10));

  // set previous Keep3rV2 version addresses
  await tendJob.connect(governor).setKeep3r(keep3rV2.address);
  await tendJob.connect(governor).setKeep3rHelper(await keep3rV2.keep3rHelper());

  return { tendJob, keep3rV2, v2Keeper, governor, keeper };
}
