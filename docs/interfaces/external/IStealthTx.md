# Solidity API

## IStealthTx

### StealthVaultSet

```solidity
event StealthVaultSet(address _stealthVault)
```

### PenaltySet

```solidity
event PenaltySet(uint256 _penalty)
```

### MigratedStealthVault

```solidity
event MigratedStealthVault(address _migratedTo)
```

### stealthVault

```solidity
function stealthVault() external view returns (address)
```

### penalty

```solidity
function penalty() external view returns (uint256)
```

### setStealthVault

```solidity
function setStealthVault(address _stealthVault) external
```

### setPenalty

```solidity
function setPenalty(uint256 _penalty) external
```
