// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

import '../utils/Keep3rBondedJob.sol';

contract Keep3rBondedJobForTest is Keep3rBondedJob {
  constructor(address _governor) Governable(_governor) Keep3rJob() {}
}
