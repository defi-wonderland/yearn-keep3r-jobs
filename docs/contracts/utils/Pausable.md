# Solidity API

## Pausable

### paused

```solidity
bool paused
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setPause

```solidity
function setPause(bool _paused) external
```

Allows governor to pause or unpause the contract

| Name     | Type | Description                                  |
| -------- | ---- | -------------------------------------------- |
| \_paused | bool | Whether the contract should be paused or not |

### notPaused

```solidity
modifier notPaused()
```

### \_setPause

```solidity
function _setPause(bool _paused) internal
```
