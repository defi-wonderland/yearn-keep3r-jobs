// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import '../HarvestV2Keep3rStealthJob.sol';

contract HarvestV2Keep3rStealthJobForTest is HarvestV2Keep3rStealthJob {
  constructor(
    address _governor,
    address _mechanicsRegistry,
    address _stealthRelayer,
    address _v2Keeper,
    uint256 _workCooldown,
    address _keep3r,
    address _keep3rHelper,
    address _bond,
    uint256 _minBond,
    uint256 _earned,
    uint256 _age,
    bool _onlyEOA
  )
    HarvestV2Keep3rStealthJob(
      _governor,
      _mechanicsRegistry,
      _stealthRelayer,
      _v2Keeper,
      _workCooldown,
      _keep3r,
      _keep3rHelper,
      _bond,
      _minBond,
      _earned,
      _age,
      _onlyEOA
    )
  {}

  uint256 internal _baseFee;

  function _gasPrice() internal view virtual override returns (uint256) {
    return _baseFee;
  }
}
