// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

import '../../contracts/utils/DustCollector.sol';

contract DustCollectorForTest is DustCollector {
  constructor() DustCollector() Governable(msg.sender) {}
}
