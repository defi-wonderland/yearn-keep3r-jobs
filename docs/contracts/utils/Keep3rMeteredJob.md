# Solidity API

## Keep3rMeteredJob

### keep3rHelper

```solidity
address keep3rHelper
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### gasBonus

```solidity
uint256 gasBonus
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### gasMultiplier

```solidity
uint256 gasMultiplier
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### BASE

```solidity
uint32 BASE
```

### maxMultiplier

```solidity
uint256 maxMultiplier
```

| Name | Type | Description |
| ---- | ---- | ----------- |

### setKeep3rHelper

```solidity
function setKeep3rHelper(address _keep3rHelper) public
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

### setMaxMultiplier

```solidity
function setMaxMultiplier(uint256 _maxMultiplier) external
```

Allows governor to set a new gas multiplier maximum

| Name            | Type    | Description                                    |
| --------------- | ------- | ---------------------------------------------- |
| \_maxMultiplier | uint256 | New maximum acceptable gasMultiplier to be set |

### setGasMultiplier

```solidity
function setGasMultiplier(uint256 _gasMultiplier) external
```

Allows governor to set a new gas multiplier

| Name            | Type    | Description                                                          |
| --------------- | ------- | -------------------------------------------------------------------- |
| \_gasMultiplier | uint256 | New multiplier that boosts gas record to calculate the keeper reward |

### upkeepMetered

```solidity
modifier upkeepMetered()
```

### \_setKeep3rHelper

```solidity
function _setKeep3rHelper(address _keep3rHelper) internal
```

### \_setGasBonus

```solidity
function _setGasBonus(uint256 _gasBonus) internal
```

### \_setMaxMultiplier

```solidity
function _setMaxMultiplier(uint256 _maxMultiplier) internal
```

### \_setGasMultiplier

```solidity
function _setGasMultiplier(uint256 _gasMultiplier) internal
```

### \_calculateGas

```solidity
function _calculateGas(uint256 _gasUsed) internal view returns (uint256 _resultingGas)
```

### \_calculateCredits

```solidity
function _calculateCredits(uint256 _gasUsed) internal view returns (uint256 _credits)
```
