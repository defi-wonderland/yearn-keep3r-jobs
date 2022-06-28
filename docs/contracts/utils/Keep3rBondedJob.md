# Solidity API

## Keep3rBondedJob

### requiredBond

```solidity
address requiredBond
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### requiredMinBond

```solidity
uint256 requiredMinBond
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### requiredEarnings

```solidity
uint256 requiredEarnings
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### requiredAge

```solidity
uint256 requiredAge
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setKeep3rRequirements

```solidity
function setKeep3rRequirements(address _bond, uint256 _minBond, uint256 _earned, uint256 _age) public
```

Allows the governor to set new requirements to work the job

| Name      | Type    | Description                                                          |
| --------- | ------- | -------------------------------------------------------------------- |
| \_bond    | address | Address of the token required to bond to work the job                |
| \_minBond | uint256 | Amount of tokens required to bond to work the job                    |
| \_earned  | uint256 | Amount of KP3R earnings required to work the job                     |
| \_age     | uint256 | Amount of seconds since keeper registration required to work the job |

### \_setKeep3rRequirements

```solidity
function _setKeep3rRequirements(address _bond, uint256 _minBond, uint256 _earned, uint256 _age) internal
```

### \_isValidKeeper

```solidity
function _isValidKeeper(address _keeper) internal virtual
```
