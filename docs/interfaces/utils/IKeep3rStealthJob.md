# Solidity API

## IKeep3rStealthJob

### StealthRelayerSet

```solidity
event StealthRelayerSet(address _stealthRelayer)
```

Emitted when a new StealthRelayer contract is set

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| \_stealthRelayer | address | Address of the new StealthRelayer contract |

### OnlyStealthRelayer

```solidity
error OnlyStealthRelayer()
```

Throws when a OnlyStealthRelayer function is called from an unknown address

### stealthRelayer

```solidity
function stealthRelayer() external view returns (address _stealthRelayer)
```

| Name             | Type    | Description                            |
| ---------------- | ------- | -------------------------------------- |
| \_stealthRelayer | address | Address of the StealthRelayer contract |

### setStealthRelayer

```solidity
function setStealthRelayer(address _stealthRelayer) external
```

Allows governor to set a new StealthRelayer contract

| Name             | Type    | Description                                |
| ---------------- | ------- | ------------------------------------------ |
| \_stealthRelayer | address | Address of the new StealthRelayer contract |
