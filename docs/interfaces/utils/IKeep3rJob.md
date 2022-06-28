# Solidity API

## IKeep3rJob

### Keep3rSet

```solidity
event Keep3rSet(address _keep3r)
```

Emitted when a new Keep3r contract is set

| Name     | Type    | Description                        |
| -------- | ------- | ---------------------------------- |
| \_keep3r | address | Address of the new Keep3r contract |

### KeeperNotValid

```solidity
error KeeperNotValid()
```

Throws when a keeper fails the validation

### keep3r

```solidity
function keep3r() external view returns (address _keep3r)
```

| Name     | Type    | Description                    |
| -------- | ------- | ------------------------------ |
| \_keep3r | address | Address of the Keep3r contract |

### setKeep3r

```solidity
function setKeep3r(address _keep3r) external
```

Allows governor to set a new Keep3r contract

| Name     | Type    | Description                        |
| -------- | ------- | ---------------------------------- |
| \_keep3r | address | Address of the new Keep3r contract |
