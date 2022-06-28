# Solidity API

## IKeep3rV1Proxy

### Recipient

```solidity
struct Recipient {
  address recipient;
  uint256 caps;
}

```

### keep3rV1

```solidity
function keep3rV1() external view returns (address)
```

### minter

```solidity
function minter() external view returns (address)
```

### next

```solidity
function next(address) external view returns (uint256)
```

### caps

```solidity
function caps(address) external view returns (uint256)
```

### recipients

```solidity
function recipients() external view returns (address[])
```

### recipientsCaps

```solidity
function recipientsCaps() external view returns (struct IKeep3rV1Proxy.Recipient[])
```

### Cooldown

```solidity
error Cooldown()
```

### NoDrawableAmount

```solidity
error NoDrawableAmount()
```

### ZeroAddress

```solidity
error ZeroAddress()
```

### OnlyMinter

```solidity
error OnlyMinter()
```

### addRecipient

```solidity
function addRecipient(address _recipient, uint256 _amount) external
```

### removeRecipient

```solidity
function removeRecipient(address _recipient) external
```

### draw

```solidity
function draw() external returns (uint256 _amount)
```

### setKeep3rV1

```solidity
function setKeep3rV1(address _keep3rV1) external
```

### setMinter

```solidity
function setMinter(address _minter) external
```

### mint

```solidity
function mint(uint256 _amount) external
```

### mint

```solidity
function mint(address _account, uint256 _amount) external
```

### setKeep3rV1Governance

```solidity
function setKeep3rV1Governance(address _governance) external
```

### acceptKeep3rV1Governance

```solidity
function acceptKeep3rV1Governance() external
```

### dispute

```solidity
function dispute(address _keeper) external
```

### slash

```solidity
function slash(address _bonded, address _keeper, uint256 _amount) external
```

### revoke

```solidity
function revoke(address _keeper) external
```

### resolve

```solidity
function resolve(address _keeper) external
```

### addJob

```solidity
function addJob(address _job) external
```

### removeJob

```solidity
function removeJob(address _job) external
```

### addKPRCredit

```solidity
function addKPRCredit(address _job, uint256 _amount) external
```

### approveLiquidity

```solidity
function approveLiquidity(address _liquidity) external
```

### revokeLiquidity

```solidity
function revokeLiquidity(address _liquidity) external
```

### setKeep3rHelper

```solidity
function setKeep3rHelper(address _keep3rHelper) external
```

### addVotes

```solidity
function addVotes(address _voter, uint256 _amount) external
```

### removeVotes

```solidity
function removeVotes(address _voter, uint256 _amount) external
```
