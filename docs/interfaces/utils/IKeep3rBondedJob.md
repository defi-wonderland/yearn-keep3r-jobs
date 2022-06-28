# Solidity API

## IKeep3rBondedJob

### Keep3rRequirementsSet

```solidity
event Keep3rRequirementsSet(address _bond, uint256 _minBond, uint256 _earned, uint256 _age)
```

Emitted when a new set of requirements is set

| Name      | Type    | Description                                                          |
| --------- | ------- | -------------------------------------------------------------------- |
| \_bond    | address | Address of the token required to bond to work the job                |
| \_minBond | uint256 | Amount of tokens required to bond to work the job                    |
| \_earned  | uint256 | Amount of KP3R earnings required to work the job                     |
| \_age     | uint256 | Amount of seconds since keeper registration required to work the job |

### requiredBond

```solidity
function requiredBond() external view returns (address _requiredBond)
```

| Name           | Type    | Description                                           |
| -------------- | ------- | ----------------------------------------------------- |
| \_requiredBond | address | Address of the token required to bond to work the job |

### requiredMinBond

```solidity
function requiredMinBond() external view returns (uint256 _requiredMinBond)
```

| Name              | Type    | Description                                       |
| ----------------- | ------- | ------------------------------------------------- |
| \_requiredMinBond | uint256 | Amount of tokens required to bond to work the job |

### requiredEarnings

```solidity
function requiredEarnings() external view returns (uint256 _requiredEarnings)
```

| Name               | Type    | Description                                      |
| ------------------ | ------- | ------------------------------------------------ |
| \_requiredEarnings | uint256 | Amount of KP3R earnings required to work the job |

### requiredAge

```solidity
function requiredAge() external view returns (uint256 _requiredAge)
```

| Name          | Type    | Description                                                          |
| ------------- | ------- | -------------------------------------------------------------------- |
| \_requiredAge | uint256 | Amount of seconds since keeper registration required to work the job |

### setKeep3rRequirements

```solidity
function setKeep3rRequirements(address _bond, uint256 _minBond, uint256 _earned, uint256 _age) external
```

Allows the governor to set new requirements to work the job

| Name      | Type    | Description                                                          |
| --------- | ------- | -------------------------------------------------------------------- |
| \_bond    | address | Address of the token required to bond to work the job                |
| \_minBond | uint256 | Amount of tokens required to bond to work the job                    |
| \_earned  | uint256 | Amount of KP3R earnings required to work the job                     |
| \_age     | uint256 | Amount of seconds since keeper registration required to work the job |
