# Solidity API

## DustCollector

### ETH_ADDRESS

```solidity
address ETH_ADDRESS
```

| Name | Type | Description |
| ---- | ---- | ----------- |

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
