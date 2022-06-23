import IKeep3rV2 from '../artifacts/solidity/interfaces/external/IKeep3rV2.sol/IKeep3rV2.json';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { constants } from '@utils';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  await hre.deployments.save('Keep3rV2', {
    address: constants.KEEP3R_V2,
    abi: IKeep3rV2.abi,
  });
};
deployFunction.dependencies = [];
deployFunction.tags = ['mainnet', 'save-contracts'];
export default deployFunction;
