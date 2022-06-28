# Solidity API

## IBaseStrategy

### Harvested

```solidity
event Harvested(uint256 _profit, uint256 _loss, uint256 _debtPayment, uint256 _debtOutstanding)
```

### vault

```solidity
function vault() external view returns (address _vault)
```

### strategist

```solidity
function strategist() external view returns (address _strategist)
```

### rewards

```solidity
function rewards() external view returns (address _rewards)
```

### keeper

```solidity
function keeper() external view returns (address _keeper)
```

### want

```solidity
function want() external view returns (address _want)
```

### name

```solidity
function name() external view returns (string _name)
```

### profitFactor

```solidity
function profitFactor() external view returns (uint256 _profitFactor)
```

### maxReportDelay

```solidity
function maxReportDelay() external view returns (uint256 _maxReportDelay)
```

### crv

```solidity
function crv() external view returns (address _crv)
```

### setStrategist

```solidity
function setStrategist(address _strategist) external
```

### setKeeper

```solidity
function setKeeper(address _keeper) external
```

### setRewards

```solidity
function setRewards(address _rewards) external
```

### tendTrigger

```solidity
function tendTrigger(uint256 _callCost) external view returns (bool)
```

### tend

```solidity
function tend() external
```

### harvestTrigger

```solidity
function harvestTrigger(uint256 _callCost) external view returns (bool)
```

### harvest

```solidity
function harvest() external
```

### setBorrowCollateralizationRatio

```solidity
function setBorrowCollateralizationRatio(uint256 _c) external
```
