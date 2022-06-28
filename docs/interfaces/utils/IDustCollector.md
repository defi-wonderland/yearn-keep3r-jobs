# Solidity API

## IDustCollector

### DustSent

```solidity
event DustSent(address _token, uint256 _amount, address _to)
```

Emitted when dust is sent

| Name     | Type    | Description                                      |
| -------- | ------- | ------------------------------------------------ |
| \_token  | address | The token that will be transferred               |
| \_amount | uint256 | The amount of the token that will be transferred |
| \_to     | address | The address which wil received the funds         |

### ETH_ADDRESS

```solidity
function ETH_ADDRESS() external view returns (address _ethAddress)
```

| Name         | Type    | Description                                     |
| ------------ | ------- | ----------------------------------------------- |
| \_ethAddress | address | Address used to trigger a native token transfer |

### sendDust

```solidity
function sendDust(address _token, uint256 _amount, address _to) external
```

Allows an authorized user to transfer the tokens or eth that may have been left in a contract

| Name     | Type    | Description                                     |
| -------- | ------- | ----------------------------------------------- |
| \_token  | address | The token that will be transferred              |
| \_amount | uint256 | The amont of the token that will be transferred |
| \_to     | address | The address that will receive the idle funds    |
