import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { shouldVerifyContract } from '../utils/deploy';
import { constants } from '@utils';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  const constructorArguments = [
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
    constants.ONLY_EOA,
  ];

  // precalculate the address of job contract and register job in Keep3rV2
  const currentNonce: number = await hre.ethers.provider.getTransactionCount(deployer);
  const jobAddress: string = hre.ethers.utils.getContractAddress({ from: deployer, nonce: currentNonce + 1 });
  await hre.deployments.execute('Keep3rV2', { from: deployer, gasLimit: 2e5, log: true }, 'addJob', jobAddress);

  const deploy = await hre.deployments.deploy('HarvestJob', {
    contract: 'solidity/contracts/HarvestV2Keep3rStealthJob.sol:HarvestV2Keep3rStealthJob',
    from: deployer,
    args: constructorArguments,
    log: true,
  });

  await hre.deployments.execute(
    'Keep3rV2',
    { from: deployer, gasLimit: 2e5, log: true },
    'changeJobOwnership',
    jobAddress,
    constants.V2_KEEPER_GOVERNOR
  );

  if (await shouldVerifyContract(deploy)) {
    await hre.run('verify:verify', {
      address: deploy.address,
      constructorArguments,
    });
  }
};
deployFunction.dependencies = ['save-contracts'];
deployFunction.tags = ['mainnet', 'harvest-job'];
export default deployFunction;
