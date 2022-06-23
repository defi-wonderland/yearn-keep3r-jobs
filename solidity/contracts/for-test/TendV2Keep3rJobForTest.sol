// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import '../TendV2Keep3rJob.sol';

contract TendV2Keep3rJobForTest is TendV2Keep3rJob {
  constructor(
    address _governor,
    address _mechanicsRegistry,
    address _v2Keeper,
    uint256 _workCooldown,
    address _keep3r,
    address _keep3rHelper,
    address _bond,
    uint256 _minBond,
    uint256 _earned,
    uint256 _age,
    bool _onlyEOA
  ) TendV2Keep3rJob(_governor, _mechanicsRegistry, _v2Keeper, _workCooldown, _keep3r, _keep3rHelper, _bond, _minBond, _earned, _age, _onlyEOA) {}

  uint256 internal _baseFee;

  function _gasPrice() internal view virtual override returns (uint256) {
    return _baseFee;
  }
}
