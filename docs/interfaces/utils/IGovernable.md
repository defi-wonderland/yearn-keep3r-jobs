# Solidity API

## IGovernable

### PendingGovernorSet

```solidity
event PendingGovernorSet(address _governor, address _pendingGovernor)
```

Emitted when a new pending governor is set

| Name              | Type    | Description                           |
| ----------------- | ------- | ------------------------------------- |
| \_governor        | address | Address of the current governor       |
| \_pendingGovernor | address | Address of the proposed next governor |

### PendingGovernorAccepted

```solidity
event PendingGovernorAccepted(address _newGovernor)
```

Emitted when a new governor is set

| Name          | Type    | Description                 |
| ------------- | ------- | --------------------------- |
| \_newGovernor | address | Address of the new governor |

### OnlyGovernor

```solidity
error OnlyGovernor()
```

Throws if a non-governor user tries to call a OnlyGovernor function

### OnlyPendingGovernor

```solidity
error OnlyPendingGovernor()
```

Throws if a non-pending-governor user tries to call a OnlyPendingGovernor function

### governor

```solidity
function governor() external view returns (address _governor)
```

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| \_governor | address | Address of the current governor |

### pendingGovernor

```solidity
function pendingGovernor() external view returns (address _pendingGovernor)
```

| Name              | Type    | Description                             |
| ----------------- | ------- | --------------------------------------- |
| \_pendingGovernor | address | Address of the current pending governor |

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
