// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

interface IKeep3rV1Helper {
  function quote(uint256 _eth) external view returns (uint256);

  function getFastGas() external view returns (uint256);

  function bonds(address _keeper) external view returns (uint256);

  function getQuoteLimit(uint256 _gasUsed) external view returns (uint256);

  function getQuoteLimitFor(address _origin, uint256 _gasUsed) external view returns (uint256);
}
