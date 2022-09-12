// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IStealthVault {
  function totalBonded() external view returns (uint256);

  function bonded(address) external view returns (uint256);

  function canUnbondAt(address) external view returns (uint256);

  function hashReportedBy(bytes32) external view returns (address);

  function isStealthVault() external pure returns (bool);

  function callers() external view returns (address[] memory _callersList);

  function callerContracts(address _caller) external view returns (address[] memory _callerContractsList);

  function caller(address _caller) external view returns (bool _enabled);

  function callerStealthContract(address _caller, address _contract) external view returns (bool _enabled);

  function bond() external payable;

  function unbondAll() external;

  function startUnbond() external;

  function cancelUnbond() external;

  function unbond(uint256 _amount) external;

  // Hash
  function validateHash(
    address _caller,
    bytes32 _hash,
    uint256 _penalty
  ) external returns (bool _valid);

  function reportHash(bytes32 _hash) external;

  function reportHashAndPay(bytes32 _hash) external payable;

  // Caller Contracts
  function enableStealthContract(address _contract) external;

  function enableStealthContracts(address[] calldata _contracts) external;

  function disableStealthContract(address _contract) external;

  function disableStealthContracts(address[] calldata _contracts) external;

  // Manageable: restricted-access
  function setEoaAuthCallProtection(bool _eoaAuthCallProtection) external;

  function setGasBuffer(uint256 _gasBuffer) external;

  // Governable: restricted-access
  function transferGovernorBond(address _caller, uint256 _amount) external;

  function transferBondToGovernor(address _caller, uint256 _amount) external;

  // Manageable: setters
  function setPendingManager(address _pendingManager) external;

  function acceptManager() external;

  // Governable: setters
  function setPendingGovernor(address _pendingGovernor) external;

  function acceptGovernor() external;

  // Collectable Dust: restricted-access
  function sendDust(
    address _to,
    address _token,
    uint256 _amount
  ) external;
}
