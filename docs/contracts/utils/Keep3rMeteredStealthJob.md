# Solidity API

## Keep3rMeteredStealthJob

### stealthRelayer

```solidity
address stealthRelayer
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setStealthRelayer

```solidity
function setStealthRelayer(address _stealthRelayer) public
```

Allows governor to set a new StealthRelayer contract

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| \_stealthRelayer | address | Address of the new StealthRelayer contract |

### onlyStealthRelayer

```solidity
modifier onlyStealthRelayer()
```

### upkeepStealthy

```solidity
modifier upkeepStealthy()
```

### \_isValidKeeper

```solidity
function _isValidKeeper(address _keeper) internal
```

### \_setStealthRelayer

```solidity
function _setStealthRelayer(address _stealthRelayer) internal
```

### \_getGasLeft

```solidity
function _getGasLeft() internal view returns (uint256 _gasLeft)
```

Return the gas left and add 1/64 in order to match real gas left at first level of depth (EIP-150)
