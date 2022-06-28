# Solidity API

## OnlyEOA

### onlyEOA

```solidity
bool onlyEOA
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setOnlyEOA

```solidity
function setOnlyEOA(bool _onlyEOA) external
```

Allows governor to set the onlyEOA condition

| Name      | Type | Description                                        |
| --------- | ---- | -------------------------------------------------- |
| \_onlyEOA | bool | Whether the keeper is required to be an EOA or not |

### \_setOnlyEOA

```solidity
function _setOnlyEOA(bool _onlyEOA) internal
```

### \_validateEOA

```solidity
function _validateEOA(address _caller) internal view
```
