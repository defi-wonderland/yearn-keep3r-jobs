# Solidity API

## IOnlyEOA

### OnlyEOASet

```solidity
event OnlyEOASet(bool _onlyEOA)
```

Emitted when onlyEOA is set

### OnlyEOA

```solidity
error OnlyEOA()
```

Throws when keeper is not tx.origin

### onlyEOA

```solidity
function onlyEOA() external returns (bool _onlyEOA)
```

| Name      | Type | Description                                        |
| --------- | ---- | -------------------------------------------------- |
| \_onlyEOA | bool | Whether the keeper is required to be an EOA or not |

### setOnlyEOA

```solidity
function setOnlyEOA(bool _onlyEOA) external
```

Allows governor to set the onlyEOA condition

| Name      | Type | Description                                        |
| --------- | ---- | -------------------------------------------------- |
| \_onlyEOA | bool | Whether the keeper is required to be an EOA or not |
