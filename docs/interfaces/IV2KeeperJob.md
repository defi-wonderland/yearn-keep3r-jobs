# Solidity API

## IV2KeeperJob

### StrategyAlreadyAdded

```solidity
error StrategyAlreadyAdded()
```

Throws if the strategy being added has already been added

### StrategyNotAdded

```solidity
error StrategyNotAdded()
```

Throws if the strategy being summoned is not added

### StrategyNotWorkable

```solidity
error StrategyNotWorkable()
```

Throws if a keeper tries to work a non-workable strategy

### ZeroCooldown

```solidity
error ZeroCooldown()
```

Throws if the cooldown is being set to 0

### StrategyAdded

```solidity
event StrategyAdded(address _strategy, uint256 _requiredAmount)
```

Emitted when a new strategy is added

| Name             | Type    | Description                                              |
| ---------------- | ------- | -------------------------------------------------------- |
| \_strategy       | address | Address of the strategy being added                      |
| \_requiredAmount | uint256 | Estimated amount of gas required to trigger the strategy |

### StrategyModified

```solidity
event StrategyModified(address _strategy, uint256 _requiredAmount)
```

Emitted when a strategy is modified

| Name             | Type    | Description                                                  |
| ---------------- | ------- | ------------------------------------------------------------ |
| \_strategy       | address | Address of the strategy being modified                       |
| \_requiredAmount | uint256 | New estimated amount of gas required to trigger the strategy |

### StrategyRemoved

```solidity
event StrategyRemoved(address _strategy)
```

Emitted when a strategy is removed

| Name       | Type    | Description                           |
| ---------- | ------- | ------------------------------------- |
| \_strategy | address | Address of the strategy being removed |

### KeeperWorked

```solidity
event KeeperWorked(address _strategy)
```

Emitted when a strategy is worked

| Name       | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| \_strategy | address | Address of the strategy being worked |

### ForceWorked

```solidity
event ForceWorked(address _strategy)
```

Emitted when a strategy is force-worked by governor or mechanic

| Name       | Type    | Description                                |
| ---------- | ------- | ------------------------------------------ |
| \_strategy | address | Address of the strategy being force-worked |

### v2Keeper

```solidity
function v2Keeper() external view returns (contract IV2Keeper _v2Keeper)
```

| Name       | Type               | Description         |
| ---------- | ------------------ | ------------------- |
| \_v2Keeper | contract IV2Keeper | Address of v2Keeper |

### strategies

```solidity
function strategies() external view returns (address[] _strategies)
```

| Name         | Type      | Description              |
| ------------ | --------- | ------------------------ |
| \_strategies | address[] | List of added strategies |

### workCooldown

```solidity
function workCooldown() external view returns (uint256 _workCooldown)
```

| Name           | Type    | Description                                                    |
| -------------- | ------- | -------------------------------------------------------------- |
| \_workCooldown | uint256 | Amount of seconds to wait until a strategy can be worked again |

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

### lastWorkAt

```solidity
function lastWorkAt(address _strategy) external view returns (uint256 _lastWorkAt)
```

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| \_strategy | address | Address of the strategy to query |

| Name         | Type    | Description                                        |
| ------------ | ------- | -------------------------------------------------- |
| \_lastWorkAt | uint256 | Timestamp of the last time the strategy was worked |

### requiredAmount

```solidity
function requiredAmount(address _strategy) external view returns (uint256 _requiredAmount)
```

| Name       | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| \_strategy | address | Address of the strategy to query |

| Name             | Type    | Description                                                       |
| ---------------- | ------- | ----------------------------------------------------------------- |
| \_requiredAmount | uint256 | Estimated amount of gas that the strategy requires to be executed |

### setV2Keeper

```solidity
function setV2Keeper(address _v2Keeper) external
```

| Name       | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| \_v2Keeper | address | Address of the new v2Keeper to set |

### setWorkCooldown

```solidity
function setWorkCooldown(uint256 _workCooldown) external
```

| Name           | Type    | Description                                                    |
| -------------- | ------- | -------------------------------------------------------------- |
| \_workCooldown | uint256 | Amount of seconds to wait until a strategy can be worked again |

### addStrategy

```solidity
function addStrategy(address _strategy, uint256 _requiredAmount) external
```

| Name             | Type    | Description                                         |
| ---------------- | ------- | --------------------------------------------------- |
| \_strategy       | address | Address of the strategy to add                      |
| \_requiredAmount | uint256 | Amount of gas that the strategy requires to execute |

### addStrategies

```solidity
function addStrategies(address[] _strategies, uint256[] _requiredAmount) external
```

| Name             | Type      | Description                                                   |
| ---------------- | --------- | ------------------------------------------------------------- |
| \_strategies     | address[] | Array of addresses of strategies to add                       |
| \_requiredAmount | uint256[] | Array of amount of gas that each strategy requires to execute |

### updateRequiredAmount

```solidity
function updateRequiredAmount(address _strategy, uint256 _requiredAmount) external
```

| Name             | Type    | Description                                            |
| ---------------- | ------- | ------------------------------------------------------ |
| \_strategy       | address | Address of the strategy to modify                      |
| \_requiredAmount | uint256 | New amount of gas that te strategy requires to execute |

### updateRequiredAmounts

```solidity
function updateRequiredAmounts(address[] _strategies, uint256[] _requiredAmounts) external
```

| Name              | Type      | Description                                                        |
| ----------------- | --------- | ------------------------------------------------------------------ |
| \_strategies      | address[] | Array of addresses of strategies to modify                         |
| \_requiredAmounts | uint256[] | Array of new amounts of gas that each strategy requires to execute |

### removeStrategy

```solidity
function removeStrategy(address _strategy) external
```

| Name       | Type    | Description                       |
| ---------- | ------- | --------------------------------- |
| \_strategy | address | Address of the strategy to remove |

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
