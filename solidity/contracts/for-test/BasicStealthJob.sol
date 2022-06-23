//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.9 <0.9.0;

import '../utils/Keep3rMeteredStealthJob.sol';

contract BasicStealthJob is Keep3rMeteredStealthJob {
  uint256 public nonce;
  mapping(uint256 => address) public dataset;

  constructor(address _stealthRelayer) Governable(msg.sender) {
    _setStealthRelayer(_stealthRelayer);
  }

  function work() external upkeepStealthy {}

  function workUnsafe() external upkeep {}

  function workHard(uint256 _howHard) external upkeepStealthy {
    _workHard(_howHard);
  }

  function workUnsafe(uint256 _howHard) external upkeep {
    _workHard(_howHard);
  }

  function workClean(uint256 _howHard, uint256 _cleanFreq) external upkeepStealthy {
    _workClean(_howHard, _cleanFreq);
  }

  function workCleanUnsafe(uint256 _howHard, uint256 _cleanFreq) external upkeep {
    _workClean(_howHard, _cleanFreq);
  }

  function _workHard(uint256 _howHard) internal {
    for (uint256 _i = 0; _i < _howHard; _i++) {
      nonce++;
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
