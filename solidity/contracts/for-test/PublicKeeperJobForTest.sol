//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import '../PublicKeeperJob.sol';

contract PublicKeeperJobForTest is PublicKeeperJob {
  constructor(
    address _governor,
    address _publicKeeper,
    address _mechanicsRegistry,
    address _vaultRegistry,
    uint256 _workCooldown
  ) PublicKeeperJob(_governor, _publicKeeper, _mechanicsRegistry, _vaultRegistry, _workCooldown) {}

  function internalWorkable(address _strategy) external view returns (bool) {
    return _workable(_strategy);
  }

  // missing implementations

  function _isValidStrategy(address _strategy) internal view virtual override returns (bool) {
    return true;
  }

  function workable(address _strategy) external view returns (bool) {}

  function forceWork(address _strategy) external {}

  function work(address _strategy) external {}
}
