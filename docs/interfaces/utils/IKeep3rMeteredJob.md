# Solidity API

## IKeep3rMeteredJob

### Keep3rHelperSet

```solidity
event Keep3rHelperSet(address _keep3rHelper)
```

Emitted when a new Keep3rHelper contract is set

| Name           | Type    | Description                              |
| -------------- | ------- | ---------------------------------------- |
| \_keep3rHelper | address | Address of the new Keep3rHelper contract |

### GasBonusSet

```solidity
event GasBonusSet(uint256 _gasBonus)
```

Emitted when a new gas bonus amount is set

| Name       | Type    | Description                                   |
| ---------- | ------- | --------------------------------------------- |
| \_gasBonus | uint256 | Amount of gas to add to cover unaccounted gas |

### GasMultiplierSet

```solidity
event GasMultiplierSet(uint256 _gasMultiplier)
```

Emitted when a new gas bonus multiplier is set

| Name            | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| \_gasMultiplier | uint256 | Multiplier that boosts gas record to calculate the keeper reward |

### MaxMultiplierSet

```solidity
event MaxMultiplierSet(uint256 _maxMultiplier)
```

Emitted when a new gas bonus multiplier maximum is set

| Name            | Type    | Description                                |
| --------------- | ------- | ------------------------------------------ |
| \_maxMultiplier | uint256 | Maximum acceptable gasMultiplier to be set |

### GasMetered

```solidity
event GasMetered(uint256 _initialGas, uint256 _gasAfterWork, uint256 _bonus)
```

Emitted when a metered job is worked

| Name           | Type    | Description                                  |
| -------------- | ------- | -------------------------------------------- |
| \_initialGas   | uint256 | First gas record registered                  |
| \_gasAfterWork | uint256 | Gas record registered after work             |
| \_bonus        | uint256 | Fixed amount of gas added to the accountance |

### MaxMultiplier

```solidity
error MaxMultiplier()
```

### keep3rHelper

```solidity
function keep3rHelper() external view returns (address _keep3rHelper)
```

| Name           | Type    | Description                          |
| -------------- | ------- | ------------------------------------ |
| \_keep3rHelper | address | Address of the Keep3rHelper contract |

### gasBonus

```solidity
function gasBonus() external view returns (uint256 _gasBonus)
```

| Name       | Type    | Description                                   |
| ---------- | ------- | --------------------------------------------- |
| \_gasBonus | uint256 | Amount of gas to add to cover unaccounted gas |

### gasMultiplier

```solidity
function gasMultiplier() external view returns (uint256 _gasMultiplier)
```

| Name            | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| \_gasMultiplier | uint256 | Multiplier that boosts gas record to calculate the keeper reward |

### maxMultiplier

```solidity
function maxMultiplier() external view returns (uint256 _maxMultiplier)
```

| Name            | Type    | Description                                |
| --------------- | ------- | ------------------------------------------ |
| \_maxMultiplier | uint256 | Maximum acceptable gasMultiplier to be set |

### BASE

```solidity
function BASE() external view returns (uint32 _BASE)
```

### setKeep3rHelper

```solidity
function setKeep3rHelper(address _keep3rHelper) external
```

Allows governor to set a new Keep3rHelper contract

| Name           | Type    | Description                              |
| -------------- | ------- | ---------------------------------------- |
| \_keep3rHelper | address | Address of the new Keep3rHelper contract |

### setGasBonus

```solidity
function setGasBonus(uint256 _gasBonus) external
```

Allows governor to set a new gas bonus amount

| Name       | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| \_gasBonus | uint256 | New amount of gas to add to cover unaccounted gas |

### setGasMultiplier

```solidity
function setGasMultiplier(uint256 _gasMultiplier) external
```

Allows governor to set a new gas multiplier

| Name            | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| \_gasMultiplier | uint256 | New multiplier that boosts gas record to calculate the keeper reward |

### setMaxMultiplier

```solidity
function setMaxMultiplier(uint256 _maxMultiplier) external
```

Allows governor to set a new gas multiplier maximum

| Name            | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| \_maxMultiplier | uint256 | New maximum acceptable gasMultiplier to be set |
