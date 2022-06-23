//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '../V2KeeperJob.sol';

contract V2KeeperJobForTest is V2KeeperJob {
  constructor(
    address _governor,
    address _mechanicsRegistry,
    address _v2Keeper,
    uint256 _workCooldown
  ) V2KeeperJob(_governor, _v2Keeper, _mechanicsRegistry, _workCooldown) {}

  function internalWorkable(address _strategy) external view returns (bool) {
    return _workable(_strategy);
  }

  function internalGetCallCosts(address _strategy) external view returns (uint256 _callCost) {
    return _getCallCosts(_strategy);
  }

  function internalAddStrategy(address _strategy, uint256 _requiredAmount) external {
    _addStrategy(_strategy, _requiredAmount);
  }

  // missing implementations

  function workable(address _strategy) external view returns (bool) {}

  function forceWork(address _strategy) external {}

  function work(address _strategy) external {}
}
