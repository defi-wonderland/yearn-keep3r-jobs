# Solidity API

## V2KeeperJob

### v2Keeper

```solidity
contract IV2Keeper v2Keeper
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### \_availableStrategies

```solidity
struct EnumerableSet.AddressSet _availableStrategies
```

### requiredAmount

```solidity
mapping(address => uint256) requiredAmount
```

| Name | Type | Description |
| ---- | ---- | ----------- |

| Name | Type | Description |
| ---- | ---- | ----------- |

### lastWorkAt

```solidity
mapping(address => uint256) lastWorkAt
```

| Name | Type | Description |
| ---- | ---- | ----------- |

| Name | Type | Description |
| ---- | ---- | ----------- |

### workCooldown

```solidity
uint256 workCooldown
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### constructor

```solidity
constructor(address _governor, address _v2Keeper, address _mechanicsRegistry, uint256 _workCooldown) internal
```

### strategies

```solidity
function strategies() public view returns (address[] _strategies)
```

| Name         | Type      | Description              |
| ------------ | --------- | ------------------------ |
| \_strategies | address[] | List of added strategies |

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
function addStrategies(address[] _strategies, uint256[] _requiredAmounts) external
```

| Name              | Type      | Description                             |
| ----------------- | --------- | --------------------------------------- |
| \_strategies      | address[] | Array of addresses of strategies to add |
| \_requiredAmounts | uint256[] |                                         |

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

### \_setV2Keeper

```solidity
function _setV2Keeper(address _v2Keeper) internal
```

### \_setWorkCooldown

```solidity
function _setWorkCooldown(uint256 _workCooldown) internal
```

### \_addStrategy

```solidity
function _addStrategy(address _strategy, uint256 _requiredAmount) internal
```

### \_updateRequiredAmount

```solidity
function _updateRequiredAmount(address _strategy, uint256 _requiredAmount) internal
```

### \_removeStrategy

```solidity
function _removeStrategy(address _strategy) internal
```

### \_setRequiredAmount

```solidity
function _setRequiredAmount(address _strategy, uint256 _requiredAmount) internal
```

### \_workable

```solidity
function _workable(address _strategy) internal view virtual returns (bool)
```

### \_getCallCosts

```solidity
function _getCallCosts(address _strategy) internal view returns (uint256 _callCost)
```

### \_workInternal

```solidity
function _workInternal(address _strategy) internal
```

### \_forceWork

```solidity
function _forceWork(address _strategy) internal
```

### \_work

```solidity
function _work(address _strategy) internal virtual
```

_This function should be implemented on the base contract_
