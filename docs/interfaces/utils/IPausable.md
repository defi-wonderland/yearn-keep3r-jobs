# Solidity API

## IPausable

### PauseSet

```solidity
event PauseSet(bool _paused)
```

Emitted when the contract pause is switched

| Name     | Type | Description                           |
| -------- | ---- | ------------------------------------- |
| \_paused | bool | Whether the contract is paused or not |

### Paused

```solidity
error Paused()
```

Throws when a keeper tries to work a paused contract

### NoChangeInPause

```solidity
error NoChangeInPause()
```

Throws when governor tries to switch pause to the same state as before

### paused

```solidity
function paused() external view returns (bool _paused)
```

| Name     | Type | Description                           |
| -------- | ---- | ------------------------------------- |
| \_paused | bool | Whether the contract is paused or not |

### setPause

```solidity
function setPause(bool _paused) external
```

Allows governor to pause or unpause the contract

| Name     | Type | Description                                  |
| -------- | ---- | -------------------------------------------- |
| \_paused | bool | Whether the contract should be paused or not |
