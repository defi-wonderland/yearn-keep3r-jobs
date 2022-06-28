# Solidity API

## IV2Keep3rStealthJob

### forceWorkUnsafe

```solidity
function forceWorkUnsafe(address _strategy) external
```

Function to be called by governor or mechanic that triggers the execution of the given strategy
This function bypasses the stealth relayer checks

| Name       | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| \_strategy | address | Address of the strategy to be worked |
