//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.9 <0.9.0;

import '../utils/Keep3rMeteredJob.sol';

contract BasicMeteredJob is Keep3rMeteredJob {
  uint256 public nonce;
  mapping(uint256 => address) public dataset;

  constructor() Governable(msg.sender) {}

  function work() external upkeepMetered {}

  function workHard(uint256 _howHard) external upkeepMetered {
    _workHard(_howHard);
  }

  function workClean(uint256 _howHard, uint256 _cleanFreq) external upkeepMetered {
    _workClean(_howHard, _cleanFreq);
  }

  function _workHard(uint256 _howHard) internal {
    for (uint256 _i = 0; _i < _howHard; _i++) {
      dataset[nonce++] = address(this);
    }
  }

  function _workClean(uint256 _howHard, uint256 _cleanFreq) internal {
    for (uint256 _i = 1; _i < _howHard; _i++) {
      dataset[_i] = address(this);
      if (_i % _cleanFreq == 0) {
        delete dataset[_i];
      }
    }
  }
}
