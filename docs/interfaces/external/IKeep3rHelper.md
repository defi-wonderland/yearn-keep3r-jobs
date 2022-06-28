# Solidity API

## IKeep3rHelper

Contains all the helper functions used throughout the different files.

### LiquidityPairInvalid

```solidity
error LiquidityPairInvalid()
```

Throws when none of the tokens in the liquidity pair is KP3R

### KP3R

```solidity
function KP3R() external view returns (address _kp3r)
```

Address of KP3R token

| Name   | Type    | Description           |
| ------ | ------- | --------------------- |
| \_kp3r | address | Address of KP3R token |

### KP3R_WETH_POOL

```solidity
function KP3R_WETH_POOL() external view returns (address _kp3rWeth)
```

Address of KP3R-WETH pool to use as oracle

| Name       | Type    | Description                                |
| ---------- | ------- | ------------------------------------------ |
| \_kp3rWeth | address | Address of KP3R-WETH pool to use as oracle |

### MIN

```solidity
function MIN() external view returns (uint256 _multiplier)
```

The minimum multiplier used to calculate the amount of gas paid to the Keeper for the gas used to perform a job
For example: if the quoted gas used is 1000, then the minimum amount to be paid will be 1000 \* MIN / BOOST_BASE

| Name         | Type    | Description        |
| ------------ | ------- | ------------------ |
| \_multiplier | uint256 | The MIN multiplier |

### MAX

```solidity
function MAX() external view returns (uint256 _multiplier)
```

The maximum multiplier used to calculate the amount of gas paid to the Keeper for the gas used to perform a job
For example: if the quoted gas used is 1000, then the maximum amount to be paid will be 1000 \* MAX / BOOST_BASE

| Name         | Type    | Description        |
| ------------ | ------- | ------------------ |
| \_multiplier | uint256 | The MAX multiplier |

### BOOST_BASE

```solidity
function BOOST_BASE() external view returns (uint256 _base)
```

The boost base used to calculate the boost rewards for the keeper

| Name   | Type    | Description           |
| ------ | ------- | --------------------- |
| \_base | uint256 | The boost base number |

### TARGETBOND

```solidity
function TARGETBOND() external view returns (uint256 _target)
```

The targeted amount of bonded KP3Rs to max-up reward multiplier
For example: if the amount of KP3R the keeper has bonded is TARGETBOND or more, then the keeper will get
the maximum boost possible in his rewards, if it's less, the reward boost will be proportional

| Name     | Type    | Description                                     |
| -------- | ------- | ----------------------------------------------- |
| \_target | uint256 | The amount of KP3R that comforms the TARGETBOND |

### quote

```solidity
function quote(uint256 _eth) external view returns (uint256 _amountOut)
```

Calculates the amount of KP3R that corresponds to the ETH passed into the function

_This function allows us to calculate how much KP3R we should pay to a keeper for things expressed in ETH, like gas_

| Name  | Type    | Description       |
| ----- | ------- | ----------------- |
| \_eth | uint256 | The amount of ETH |

| Name        | Type    | Description        |
| ----------- | ------- | ------------------ |
| \_amountOut | uint256 | The amount of KP3R |

### bonds

```solidity
function bonds(address _keeper) external view returns (uint256 _amountBonded)
```

Returns the amount of KP3R the keeper has bonded

| Name     | Type    | Description                        |
| -------- | ------- | ---------------------------------- |
| \_keeper | address | The address of the keeper to check |

| Name           | Type    | Description                              |
| -------------- | ------- | ---------------------------------------- |
| \_amountBonded | uint256 | The amount of KP3R the keeper has bonded |

### getRewardAmountFor

```solidity
function getRewardAmountFor(address _keeper, uint256 _gasUsed) external view returns (uint256 _kp3r)
```

Calculates the reward (in KP3R) that corresponds to a keeper for using gas

| Name      | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| \_keeper  | address | The address of the keeper to check           |
| \_gasUsed | uint256 | The amount of gas used that will be rewarded |

| Name   | Type    | Description                                             |
| ------ | ------- | ------------------------------------------------------- |
| \_kp3r | uint256 | The amount of KP3R that should be awarded to the keeper |

### getRewardBoostFor

```solidity
function getRewardBoostFor(uint256 _bonds) external view returns (uint256 _rewardBoost)
```

Calculates the boost in the reward given to a keeper based on the amount of KP3R that keeper has bonded

| Name    | Type    | Description                                    |
| ------- | ------- | ---------------------------------------------- |
| \_bonds | uint256 | The amount of KP3R tokens bonded by the keeper |

| Name          | Type    | Description                                     |
| ------------- | ------- | ----------------------------------------------- |
| \_rewardBoost | uint256 | The reward boost that corresponds to the keeper |

### getRewardAmount

```solidity
function getRewardAmount(uint256 _gasUsed) external view returns (uint256 _amount)
```

Calculates the reward (in KP3R) that corresponds to tx.origin for using gas

| Name      | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| \_gasUsed | uint256 | The amount of gas used that will be rewarded |

| Name     | Type    | Description                                            |
| -------- | ------- | ------------------------------------------------------ |
| \_amount | uint256 | The amount of KP3R that should be awarded to tx.origin |

### getPoolTokens

```solidity
function getPoolTokens(address _pool) external view returns (address _token0, address _token1)
```

Given a pool address, returns the underlying tokens of the pair

| Name   | Type    | Description                       |
| ------ | ------- | --------------------------------- |
| \_pool | address | Address of the correspondant pool |

| Name     | Type    | Description                             |
| -------- | ------- | --------------------------------------- |
| \_token0 | address | Address of the first token of the pair  |
| \_token1 | address | Address of the second token of the pair |

### isKP3RToken0

```solidity
function isKP3RToken0(address _pool) external view returns (bool _isKP3RToken0)
```

Defines the order of the tokens in the pair for twap calculations

| Name   | Type    | Description                       |
| ------ | ------- | --------------------------------- |
| \_pool | address | Address of the correspondant pool |

| Name           | Type | Description                                            |
| -------------- | ---- | ------------------------------------------------------ |
| \_isKP3RToken0 | bool | Boolean indicating the order of the tokens in the pair |

### observe

```solidity
function observe(address _pool, uint32[] _secondsAgo) external view returns (int56 _tickCumulative1, int56 _tickCumulative2, bool _success)
```

Given an array of secondsAgo, returns UniswapV3 pool cumulatives at that moment

| Name         | Type     | Description                           |
| ------------ | -------- | ------------------------------------- |
| \_pool       | address  | Address of the pool to observe        |
| \_secondsAgo | uint32[] | Array with time references to observe |

| Name              | Type  | Description                                           |
| ----------------- | ----- | ----------------------------------------------------- |
| \_tickCumulative1 | int56 | Cummulative sum of ticks until first time reference   |
| \_tickCumulative2 | int56 | Cummulative sum of ticks until second time reference  |
| \_success         | bool  | Boolean indicating if the observe call was succesfull |

### getKP3RsAtTick

```solidity
function getKP3RsAtTick(uint256 _liquidityAmount, int56 _tickDifference, uint256 _timeInterval) external pure returns (uint256 _kp3rAmount)
```

Given a tick and a liquidity amount, calculates the underlying KP3R tokens

| Name              | Type    | Description                            |
| ----------------- | ------- | -------------------------------------- |
| \_liquidityAmount | uint256 | Amount of liquidity to be converted    |
| \_tickDifference  | int56   | Tick value used to calculate the quote |
| \_timeInterval    | uint256 | Time value used to calculate the quote |

| Name         | Type    | Description                                             |
| ------------ | ------- | ------------------------------------------------------- |
| \_kp3rAmount | uint256 | Amount of KP3R tokens underlying on the given liquidity |

### getQuoteAtTick

```solidity
function getQuoteAtTick(uint128 _baseAmount, int56 _tickDifference, uint256 _timeInterval) external pure returns (uint256 _quoteAmount)
```

Given a tick and a token amount, calculates the output in correspondant token

| Name             | Type    | Description                            |
| ---------------- | ------- | -------------------------------------- |
| \_baseAmount     | uint128 | Amount of token to be converted        |
| \_tickDifference | int56   | Tick value used to calculate the quote |
| \_timeInterval   | uint256 | Time value used to calculate the quote |

| Name          | Type    | Description                                                     |
| ------------- | ------- | --------------------------------------------------------------- |
| \_quoteAmount | uint256 | Amount of credits deserved for the baseAmount at the tick value |
