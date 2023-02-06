// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import '../HarvestPublicKeep3rJob.sol';

contract HarvestPublicKeep3rJobForTest is HarvestPublicKeep3rJob {
  using EnumerableSet for EnumerableSet.AddressSet;

  constructor(
    address _governor,
    address _mechanicsRegistry,
    address _publicKeeper,
    address _vaultRegistry,
    uint256 _workCooldown,
    address _keep3r
  ) HarvestPublicKeep3rJob(_governor, _mechanicsRegistry, _publicKeeper, _vaultRegistry, _workCooldown, _keep3r) {}

  uint256 internal _baseFee;

  function _gasPrice() internal view virtual override returns (uint256) {
    return _baseFee;
  }

  function internalIgnoreStrategy(address _strategy) external {
    _ignoredStrategies.add(_strategy);
  }
}
