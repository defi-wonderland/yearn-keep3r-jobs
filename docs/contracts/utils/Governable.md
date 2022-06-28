# Solidity API

## Governable

### governor

```solidity
address governor
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### pendingGovernor

```solidity
address pendingGovernor
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### constructor

```solidity
constructor(address _governor) internal
```

### setPendingGovernor

```solidity
function setPendingGovernor(address _pendingGovernor) external
```

Allows a governor to propose a new governor

| Name              | Type    | Description                          |
| ----------------- | ------- | ------------------------------------ |
| \_pendingGovernor | address | Address of the proposed new governor |

### acceptPendingGovernor

```solidity
function acceptPendingGovernor() external
```

Allows a proposed governor to accept the governance

### onlyGovernor

```solidity
modifier onlyGovernor()
```

### onlyPendingGovernor

```solidity
modifier onlyPendingGovernor()
```

### \_setPendingGovernor

```solidity
function _setPendingGovernor(address _pendingGovernor) internal
```

### \_acceptPendingGovernor

```solidity
function _acceptPendingGovernor() internal
```
