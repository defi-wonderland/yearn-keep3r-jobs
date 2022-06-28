# Solidity API

## IKeep3rV1Helper

### quote

```solidity
function quote(uint256 _eth) external view returns (uint256)
```

### getFastGas

```solidity
function getFastGas() external view returns (uint256)
```

### bonds

```solidity
function bonds(address _keeper) external view returns (uint256)
```

### getQuoteLimit

```solidity
function getQuoteLimit(uint256 _gasUsed) external view returns (uint256)
```

### getQuoteLimitFor

```solidity
function getQuoteLimitFor(address _origin, uint256 _gasUsed) external view returns (uint256)
```
