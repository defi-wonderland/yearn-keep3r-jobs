//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.9 <0.9.0;

import '../../interfaces/IV2KeeperJob.sol';
import '../../interfaces/external/IStealthRelayer.sol';

contract V2JobProxyForTest {
  address public stealthRelayer;

  constructor(address _stealthRelayer) {
    stealthRelayer = _stealthRelayer;
  }

  function callWork(address _job, address _strategy) external {
    IV2KeeperJob(_job).work(_strategy);
  }

  function callExecuteAndPay(
    address _job,
    bytes memory _callData,
    bytes32 _stealthHash,
    uint256 _blockNumber,
    uint256 _payment
  ) external returns (bytes memory _returnData) {
    return IStealthRelayer(stealthRelayer).executeAndPay(_job, _callData, _stealthHash, _blockNumber, _payment);
  }
}
