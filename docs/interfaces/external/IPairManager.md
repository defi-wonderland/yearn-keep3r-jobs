# Solidity API

## IPairManager

Generic interface for Keep3r liquidity pools (kLP)

### pool

```solidity
function pool() external view returns (address _pool)
```

Address of the pool from which the Keep3r pair manager will interact with

| Name   | Type    | Description        |
| ------ | ------- | ------------------ |
| \_pool | address | The pool's address |

### token0

```solidity
function token0() external view returns (address _token0)
```

Token0 of the pool

| Name     | Type    | Description           |
| -------- | ------- | --------------------- |
| \_token0 | address | The address of token0 |

### token1

```solidity
function token1() external view returns (address _token1)
```

Token1 of the pool

| Name     | Type    | Description           |
| -------- | ------- | --------------------- |
| \_token1 | address | The address of token1 |
