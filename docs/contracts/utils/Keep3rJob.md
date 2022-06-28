# Solidity API

## Keep3rJob

### keep3r

```solidity
address keep3r
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setKeep3r

```solidity
function setKeep3r(address _keep3r) public
```

Allows governor to set a new Keep3r contract

| Name     | Type    | Description                        |
| -------- | ------- | ---------------------------------- |
| \_keep3r | address | Address of the new Keep3r contract |

### upkeep

```solidity
modifier upkeep()
```

### \_setKeep3r

```solidity
function _setKeep3r(address _keep3r) internal
```

### \_isValidKeeper

```solidity
function _isValidKeeper(address _keeper) internal virtual
```
