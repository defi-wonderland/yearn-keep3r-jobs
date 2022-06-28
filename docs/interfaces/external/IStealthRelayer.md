# Solidity API

## IStealthRelayer

### caller

```solidity
function caller() external view returns (address _caller)
```

### forceBlockProtection

```solidity
function forceBlockProtection() external view returns (bool _forceBlockProtection)
```

### jobs

```solidity
function jobs() external view returns (address[] _jobsList)
```

### setForceBlockProtection

```solidity
function setForceBlockProtection(bool _forceBlockProtection) external
```

### addJobs

```solidity
function addJobs(address[] _jobsList) external
```

### addJob

```solidity
function addJob(address _job) external
```

### removeJobs

```solidity
function removeJobs(address[] _jobsList) external
```

### removeJob

```solidity
function removeJob(address _job) external
```

### execute

```solidity
function execute(address _address, bytes _callData, bytes32 _stealthHash, uint256 _blockNumber) external payable returns (bytes _returnData)
```

### executeAndPay

```solidity
function executeAndPay(address _address, bytes _callData, bytes32 _stealthHash, uint256 _blockNumber, uint256 _payment) external payable returns (bytes _returnData)
```

### executeWithoutBlockProtection

```solidity
function executeWithoutBlockProtection(address _address, bytes _callData, bytes32 _stealthHash) external payable returns (bytes _returnData)
```

### executeWithoutBlockProtectionAndPay

```solidity
function executeWithoutBlockProtectionAndPay(address _job, bytes _callData, bytes32 _stealthHash, uint256 _payment) external payable returns (bytes _returnData)
```
