# Solidity API

## MachineryReady

### OnlyGovernorOrMechanic

```solidity
error OnlyGovernorOrMechanic()
```

Throws when a OnlyGovernorOrMechanic function is called from an unknown address

### constructor

```solidity
constructor(address _mechanicsRegistry) internal
```

### setMechanicsRegistry

```solidity
function setMechanicsRegistry(address _mechanicsRegistry) external
```

Allows governor to set a new MechanicsRegistry contract

| Name                | Type    | Description                                   |
| ------------------- | ------- | --------------------------------------------- |
| \_mechanicsRegistry | address | Address of the new MechanicsRegistry contract |

### onlyGovernorOrMechanic

```solidity
modifier onlyGovernorOrMechanic()
```

### \_validateGovernorOrMechanic

```solidity
function _validateGovernorOrMechanic(address _user) internal view
```
