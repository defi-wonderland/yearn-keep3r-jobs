# Solidity API

## IKeep3rV1

### Checkpoint

```solidity
struct Checkpoint {
  uint32 fromBlock;
  uint256 votes;
}

```

### DelegateChanged

```solidity
event DelegateChanged(address _delegator, address _fromDelegate, address _toDelegate)
```

### DelegateVotesChanged

```solidity
event DelegateVotesChanged(address _delegate, uint256 _previousBalance, uint256 _newBalance)
```

### SubmitJob

```solidity
event SubmitJob(address _job, address _liquidity, address _provider, uint256 _block, uint256 _credit)
```

### ApplyCredit

```solidity
event ApplyCredit(address _job, address _liquidity, address _provider, uint256 _block, uint256 _credit)
```

### RemoveJob

```solidity
event RemoveJob(address _job, address _liquidity, address _provider, uint256 _block, uint256 _credit)
```

### UnbondJob

```solidity
event UnbondJob(address _job, address _liquidity, address _provider, uint256 _block, uint256 _credit)
```

### JobAdded

```solidity
event JobAdded(address _job, uint256 _block, address _governance)
```

### JobRemoved

```solidity
event JobRemoved(address _job, uint256 _block, address _governance)
```

### KeeperWorked

```solidity
event KeeperWorked(address _credit, address _job, address _keeper, uint256 _block, uint256 _amount)
```

### KeeperBonding

```solidity
event KeeperBonding(address _keeper, uint256 _block, uint256 _active, uint256 _bond)
```

### KeeperBonded

```solidity
event KeeperBonded(address _keeper, uint256 _block, uint256 _activated, uint256 _bond)
```

### KeeperUnbonding

```solidity
event KeeperUnbonding(address _keeper, uint256 _block, uint256 _deactive, uint256 _bond)
```

### KeeperUnbound

```solidity
event KeeperUnbound(address _keeper, uint256 _block, uint256 _deactivated, uint256 _bond)
```

### KeeperSlashed

```solidity
event KeeperSlashed(address _keeper, address _slasher, uint256 _block, uint256 _slash)
```

### KeeperDispute

```solidity
event KeeperDispute(address _keeper, uint256 _block)
```

### KeeperResolved

```solidity
event KeeperResolved(address _keeper, uint256 _block)
```

### TokenCreditAddition

```solidity
event TokenCreditAddition(address _credit, address _job, address _creditor, uint256 _block, uint256 _amount)
```

### KPRH

```solidity
function KPRH() external view returns (contract IKeep3rV1Helper)
```

### delegates

```solidity
function delegates(address _delegator) external view returns (address)
```

### checkpoints

```solidity
function checkpoints(address _account, uint32 _checkpoint) external view returns (struct IKeep3rV1.Checkpoint)
```

### numCheckpoints

```solidity
function numCheckpoints(address _account) external view returns (uint32)
```

### DOMAIN_TYPEHASH

```solidity
function DOMAIN_TYPEHASH() external returns (bytes32)
```

### DOMAINSEPARATOR

```solidity
function DOMAINSEPARATOR() external returns (bytes32)
```

### DELEGATION_TYPEHASH

```solidity
function DELEGATION_TYPEHASH() external returns (bytes32)
```

### PERMIT_TYPEHASH

```solidity
function PERMIT_TYPEHASH() external returns (bytes32)
```

### nonces

```solidity
function nonces(address _user) external view returns (uint256)
```

### BOND

```solidity
function BOND() external returns (uint256)
```

### UNBOND

```solidity
function UNBOND() external returns (uint256)
```

### LIQUIDITYBOND

```solidity
function LIQUIDITYBOND() external returns (uint256)
```

### FEE

```solidity
function FEE() external returns (uint256)
```

### BASE

```solidity
function BASE() external returns (uint256)
```

### ETH

```solidity
function ETH() external returns (address)
```

### bondings

```solidity
function bondings(address _user, address _bonding) external view returns (uint256)
```

### canWithdrawAfter

```solidity
function canWithdrawAfter(address _user, address _bonding) external view returns (uint256)
```

### pendingUnbonds

```solidity
function pendingUnbonds(address _keeper, address _bonding) external view returns (uint256)
```

### pendingbonds

```solidity
function pendingbonds(address _keeper, address _bonding) external view returns (uint256)
```

### bonds

```solidity
function bonds(address _keeper, address _bonding) external view returns (uint256)
```

### votes

```solidity
function votes(address _delegator) external view returns (uint256)
```

### firstSeen

```solidity
function firstSeen(address _keeper) external view returns (uint256)
```

### disputes

```solidity
function disputes(address _keeper) external view returns (bool)
```

### lastJob

```solidity
function lastJob(address _keeper) external view returns (uint256)
```

### workCompleted

```solidity
function workCompleted(address _keeper) external view returns (uint256)
```

### jobs

```solidity
function jobs(address _job) external view returns (bool)
```

### credits

```solidity
function credits(address _job, address _credit) external view returns (uint256)
```

### liquidityProvided

```solidity
function liquidityProvided(address _provider, address _liquidity, address _job) external view returns (uint256)
```

### liquidityUnbonding

```solidity
function liquidityUnbonding(address _provider, address _liquidity, address _job) external view returns (uint256)
```

### liquidityAmountsUnbonding

```solidity
function liquidityAmountsUnbonding(address _provider, address _liquidity, address _job) external view returns (uint256)
```

### jobProposalDelay

```solidity
function jobProposalDelay(address _job) external view returns (uint256)
```

### liquidityApplied

```solidity
function liquidityApplied(address _provider, address _liquidity, address _job) external view returns (uint256)
```

### liquidityAmount

```solidity
function liquidityAmount(address _provider, address _liquidity, address _job) external view returns (uint256)
```

### keepers

```solidity
function keepers(address _keeper) external view returns (bool)
```

### blacklist

```solidity
function blacklist(address _keeper) external view returns (bool)
```

### keeperList

```solidity
function keeperList(uint256 _index) external view returns (address)
```

### jobList

```solidity
function jobList(uint256 _index) external view returns (address)
```

### governance

```solidity
function governance() external returns (address)
```

### pendingGovernance

```solidity
function pendingGovernance() external returns (address)
```

### liquidityAccepted

```solidity
function liquidityAccepted(address _liquidity) external view returns (bool)
```

### liquidityPairs

```solidity
function liquidityPairs(uint256 _index) external view returns (address)
```

### getCurrentVotes

```solidity
function getCurrentVotes(address _account) external view returns (uint256)
```

### addCreditETH

```solidity
function addCreditETH(address _job) external payable
```

### addCredit

```solidity
function addCredit(address _credit, address _job, uint256 _amount) external
```

### addVotes

```solidity
function addVotes(address _voter, uint256 _amount) external
```

### removeVotes

```solidity
function removeVotes(address _voter, uint256 _amount) external
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

### pairs

```solidity
function pairs() external view returns (address[])
```

### addLiquidityToJob

```solidity
function addLiquidityToJob(address _liquidity, address _job, uint256 _amount) external
```

### applyCreditToJob

```solidity
function applyCreditToJob(address _provider, address _liquidity, address _job) external
```

### unbondLiquidityFromJob

```solidity
function unbondLiquidityFromJob(address _liquidity, address _job, uint256 _amount) external
```

### removeLiquidityFromJob

```solidity
function removeLiquidityFromJob(address _liquidity, address _job) external
```

### mint

```solidity
function mint(uint256 _amount) external
```

### burn

```solidity
function burn(uint256 _amount) external
```

### worked

```solidity
function worked(address _keeper) external
```

### receipt

```solidity
function receipt(address _credit, address _keeper, uint256 _amount) external
```

### workReceipt

```solidity
function workReceipt(address _keeper, uint256 _amount) external
```

### receiptETH

```solidity
function receiptETH(address _keeper, uint256 _amount) external
```

### addJob

```solidity
function addJob(address _job) external
```

### getJobs

```solidity
function getJobs() external view returns (address[])
```

### removeJob

```solidity
function removeJob(address _job) external
```

### setKeep3rHelper

```solidity
function setKeep3rHelper(address _keep3rHelper) external
```

### setGovernance

```solidity
function setGovernance(address _governance) external
```

### acceptGovernance

```solidity
function acceptGovernance() external
```

### isKeeper

```solidity
function isKeeper(address _keeper) external returns (bool)
```

### isMinKeeper

```solidity
function isMinKeeper(address _keeper, uint256 _minBond, uint256 _earned, uint256 _age) external returns (bool)
```

### isBondedKeeper

```solidity
function isBondedKeeper(address _keeper, address _bond, uint256 _minBond, uint256 _earned, uint256 _age) external returns (bool)
```

### bond

```solidity
function bond(address _bonding, uint256 _amount) external
```

### getKeepers

```solidity
function getKeepers() external view returns (address[])
```

### activate

```solidity
function activate(address _bonding) external
```

### unbond

```solidity
function unbond(address _bonding, uint256 _amount) external
```

### slash

```solidity
function slash(address _bonded, address _keeper, uint256 _amount) external
```

### withdraw

```solidity
function withdraw(address _bonding) external
```

### dispute

```solidity
function dispute(address _keeper) external
```

### revoke

```solidity
function revoke(address _keeper) external
```

### resolve

```solidity
function resolve(address _keeper) external
```

### permit

```solidity
function permit(address _owner, address _spender, uint256 _amount, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s) external
```
