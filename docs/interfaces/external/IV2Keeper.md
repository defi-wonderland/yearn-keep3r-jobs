# Solidity API

## IV2Keeper

### jobs

```solidity
function jobs() external view returns (address[])
```

### JobAdded

```solidity
event JobAdded(address _job)
```

### JobRemoved

```solidity
event JobRemoved(address _job)
```

### addJobs

```solidity
function addJobs(address[] _jobs) external
```

### addJob

```solidity
function addJob(address _job) external
```

### removeJob

```solidity
function removeJob(address _job) external
```

### tend

```solidity
function tend(address _strategy) external
```

### harvest

```solidity
function harvest(address _strategy) external
```
