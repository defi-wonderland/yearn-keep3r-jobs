# Solidity API

## HarvestV2Keep3rStealthJob

### constructor

```solidity
constructor(address _governor, address _mechanicsRegistry, address _stealthRelayer, address _v2Keeper, uint256 _workCooldown, address _keep3r, address _keep3rHelper, address _bond, uint256 _minBond, uint256 _earned, uint256 _age, bool _onlyEOA) public
```

### workable

```solidity
function workable(address _strategy) external view returns (bool _isWorkable)
```

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| \_strategy | address | Address of the strategy to query |

| Name         | Type | Description                                     |
| ------------ | ---- | ----------------------------------------------- |
| \_isWorkable | bool | Whether the queried strategy is workable or not |

### work

```solidity
function work(address _strategy) external
```

Function to be called by the keeper that triggers the execution of the given strategy

| Name       | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| \_strategy | address | Address of the strategy to be worked |

### forceWork

```solidity
function forceWork(address _strategy) external
```

Function to be called by governor or mechanics that triggers the execution of the given strategy
This function bypasses the workable checks

| Name       | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| \_strategy | address | Address of the strategy to be worked |

### forceWorkUnsafe

```solidity
function forceWorkUnsafe(address _strategy) external
```

Function to be called by governor or mechanic that triggers the execution of the given strategy
This function bypasses the stealth relayer checks

| Name       | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| \_strategy | address | Address of the strategy to be worked |

### \_workable

```solidity
function _workable(address _strategy) internal view returns (bool _isWorkable)
```

### \_work

```solidity
function _work(address _strategy) internal
```

_This function should be implemented on the base contract_
