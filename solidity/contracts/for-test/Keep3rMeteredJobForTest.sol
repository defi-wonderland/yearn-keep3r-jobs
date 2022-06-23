// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

import '../utils/Keep3rMeteredJob.sol';

contract Keep3rMeteredJobForTest is Keep3rMeteredJob {
  constructor(address _governance) Governable(_governance) {}

  function internalCalculateCredits(uint256 _gasUsed) external view returns (uint256 _credits) {
    return _calculateCredits(_gasUsed);
  }
}
