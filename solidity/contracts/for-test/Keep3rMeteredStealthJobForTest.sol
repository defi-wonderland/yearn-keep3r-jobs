// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

import '../utils/Keep3rMeteredStealthJob.sol';

contract Keep3rMeteredStealthJobForTest is Keep3rMeteredStealthJob {
  constructor(address _stealthRelayer) Governable(msg.sender) {
    _setStealthRelayer(_stealthRelayer);
  }
}
