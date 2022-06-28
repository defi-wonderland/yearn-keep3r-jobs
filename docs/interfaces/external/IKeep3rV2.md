# Solidity API

## IKeep3rV2

### TickCache

```solidity
struct TickCache {
  int56 current;
  int56 difference;
  uint256 period;
}

```

### Keep3rHelperChange

```solidity
event Keep3rHelperChange(address _keep3rHelper)
```

Emitted when the Keep3rHelper address is changed

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| \_keep3rHelper | address | The address of Keep3rHelper's contract |

### Keep3rV1Change

```solidity
event Keep3rV1Change(address _keep3rV1)
```

Emitted when the Keep3rV1 address is changed

| Name       | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| \_keep3rV1 | address | The address of Keep3rV1's contract |

### Keep3rV1ProxyChange

```solidity
event Keep3rV1ProxyChange(address _keep3rV1Proxy)
```

Emitted when the Keep3rV1Proxy address is changed

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| \_keep3rV1Proxy | address | The address of Keep3rV1Proxy's contract |

### Kp3rWethPoolChange

```solidity
event Kp3rWethPoolChange(address _kp3rWethPool)
```

Emitted when the KP3R-WETH pool address is changed

| Name           | Type    | Description                       |
| -------------- | ------- | --------------------------------- |
| \_kp3rWethPool | address | The address of the KP3R-WETH pool |

### BondTimeChange

```solidity
event BondTimeChange(uint256 _bondTime)
```

Emitted when bondTime is changed

| Name       | Type    | Description      |
| ---------- | ------- | ---------------- |
| \_bondTime | uint256 | The new bondTime |

### LiquidityMinimumChange

```solidity
event LiquidityMinimumChange(uint256 _liquidityMinimum)
```

Emitted when \_liquidityMinimum is changed

| Name               | Type    | Description                |
| ------------------ | ------- | -------------------------- |
| \_liquidityMinimum | uint256 | The new \_liquidityMinimum |

### UnbondTimeChange

```solidity
event UnbondTimeChange(uint256 _unbondTime)
```

Emitted when \_unbondTime is changed

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| \_unbondTime | uint256 | The new \_unbondTime |

### RewardPeriodTimeChange

```solidity
event RewardPeriodTimeChange(uint256 _rewardPeriodTime)
```

Emitted when \_rewardPeriodTime is changed

| Name               | Type    | Description                |
| ------------------ | ------- | -------------------------- |
| \_rewardPeriodTime | uint256 | The new \_rewardPeriodTime |

### InflationPeriodChange

```solidity
event InflationPeriodChange(uint256 _inflationPeriod)
```

Emitted when the inflationPeriod is changed

| Name              | Type    | Description             |
| ----------------- | ------- | ----------------------- |
| \_inflationPeriod | uint256 | The new inflationPeriod |

### FeeChange

```solidity
event FeeChange(uint256 _fee)
```

Emitted when the fee is changed

| Name  | Type    | Description               |
| ----- | ------- | ------------------------- |
| \_fee | uint256 | The new token credits fee |

### SlasherAdded

```solidity
event SlasherAdded(address _slasher)
```

Emitted when a slasher is added

| Name      | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| \_slasher | address | Address of the added slasher |

### SlasherRemoved

```solidity
event SlasherRemoved(address _slasher)
```

Emitted when a slasher is removed

| Name      | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| \_slasher | address | Address of the removed slasher |

### DisputerAdded

```solidity
event DisputerAdded(address _disputer)
```

Emitted when a disputer is added

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| \_disputer | address | Address of the added disputer |

### DisputerRemoved

```solidity
event DisputerRemoved(address _disputer)
```

Emitted when a disputer is removed

| Name       | Type    | Description                     |
| ---------- | ------- | ------------------------------- |
| \_disputer | address | Address of the removed disputer |

### Bonding

```solidity
event Bonding(address _keeper, address _bonding, uint256 _amount)
```

Emitted when the bonding process of a new keeper begins

| Name      | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| \_keeper  | address | The caller of Keep3rKeeperFundable#bond function |
| \_bonding | address | The asset the keeper has bonded                  |
| \_amount  | uint256 | The amount the keeper has bonded                 |

### Unbonding

```solidity
event Unbonding(address _keeperOrJob, address _unbonding, uint256 _amount)
```

Emitted when a keeper or job begins the unbonding process to withdraw the funds

| Name          | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| \_keeperOrJob | address | The keeper or job that began the unbonding process |
| \_unbonding   | address | The liquidity pair or asset being unbonded         |
| \_amount      | uint256 | The amount being unbonded                          |

### Activation

```solidity
event Activation(address _keeper, address _bond, uint256 _amount)
```

Emitted when Keep3rKeeperFundable#activate is called

| Name     | Type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| \_keeper | address | The keeper that has been activated            |
| \_bond   | address | The asset the keeper has bonded               |
| \_amount | uint256 | The amount of the asset the keeper has bonded |

### Withdrawal

```solidity
event Withdrawal(address _keeper, address _bond, uint256 _amount)
```

Emitted when Keep3rKeeperFundable#withdraw is called

| Name     | Type    | Description                                          |
| -------- | ------- | ---------------------------------------------------- |
| \_keeper | address | The caller of Keep3rKeeperFundable#withdraw function |
| \_bond   | address | The asset to withdraw from the bonding pool          |
| \_amount | uint256 | The amount of funds withdrawn                        |

### KeeperSlash

```solidity
event KeeperSlash(address _keeper, address _slasher, uint256 _amount)
```

Emitted when Keep3rKeeperDisputable#slash is called

| Name      | Type    | Description                                       |
| --------- | ------- | ------------------------------------------------- |
| \_keeper  | address | The slashed keeper                                |
| \_slasher | address | The user that called Keep3rKeeperDisputable#slash |
| \_amount  | uint256 | The amount of credits slashed from the keeper     |

### KeeperRevoke

```solidity
event KeeperRevoke(address _keeper, address _slasher)
```

Emitted when Keep3rKeeperDisputable#revoke is called

| Name      | Type    | Description                                        |
| --------- | ------- | -------------------------------------------------- |
| \_keeper  | address | The revoked keeper                                 |
| \_slasher | address | The user that called Keep3rKeeperDisputable#revoke |

### TokenCreditAddition

```solidity
event TokenCreditAddition(address _job, address _token, address _provider, uint256 _amount)
```

Emitted when Keep3rJobFundableCredits#addTokenCreditsToJob is called

| Name       | Type    | Description                                 |
| ---------- | ------- | ------------------------------------------- |
| \_job      | address | The address of the job being credited       |
| \_token    | address | The address of the token being provided     |
| \_provider | address | The user that calls the function            |
| \_amount   | uint256 | The amount of credit being added to the job |

### TokenCreditWithdrawal

```solidity
event TokenCreditWithdrawal(address _job, address _token, address _receiver, uint256 _amount)
```

Emitted when Keep3rJobFundableCredits#withdrawTokenCreditsFromJob is called

| Name       | Type    | Description                                                 |
| ---------- | ------- | ----------------------------------------------------------- |
| \_job      | address | The address of the job from which the credits are withdrawn |
| \_token    | address | The credit being withdrawn from the job                     |
| \_receiver | address | The user that receives the tokens                           |
| \_amount   | uint256 | The amount of credit withdrawn                              |

### LiquidityApproval

```solidity
event LiquidityApproval(address _liquidity)
```

Emitted when Keep3rJobFundableLiquidity#approveLiquidity function is called

| Name        | Type    | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| \_liquidity | address | The address of the liquidity pair being approved |

### LiquidityRevocation

```solidity
event LiquidityRevocation(address _liquidity)
```

Emitted when Keep3rJobFundableLiquidity#revokeLiquidity function is called

| Name        | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| \_liquidity | address | The address of the liquidity pair being revoked |

### LiquidityAddition

```solidity
event LiquidityAddition(address _job, address _liquidity, address _provider, uint256 _amount)
```

Emitted when IKeep3rJobFundableLiquidity#addLiquidityToJob function is called

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| \_job       | address | The address of the job to which liquidity will be added |
| \_liquidity | address | The address of the liquidity being added                |
| \_provider  | address | The user that calls the function                        |
| \_amount    | uint256 | The amount of liquidity being added                     |

### LiquidityWithdrawal

```solidity
event LiquidityWithdrawal(address _job, address _liquidity, address _receiver, uint256 _amount)
```

Emitted when IKeep3rJobFundableLiquidity#withdrawLiquidityFromJob function is called

| Name        | Type    | Description                                                      |
| ----------- | ------- | ---------------------------------------------------------------- |
| \_job       | address | The address of the job of which liquidity will be withdrawn from |
| \_liquidity | address | The address of the liquidity being withdrawn                     |
| \_receiver  | address | The receiver of the liquidity tokens                             |
| \_amount    | uint256 | The amount of liquidity being withdrawn from the job             |

### LiquidityCreditsReward

```solidity
event LiquidityCreditsReward(address _job, uint256 _rewardedAt, uint256 _currentCredits, uint256 _periodCredits)
```

Emitted when Keep3rJobFundableLiquidity#addLiquidityToJob function is called

| Name             | Type    | Description                                          |
| ---------------- | ------- | ---------------------------------------------------- |
| \_job            | address | The address of the job whose credits will be updated |
| \_rewardedAt     | uint256 | The time at which the job was last rewarded          |
| \_currentCredits | uint256 | The current credits of the job                       |
| \_periodCredits  | uint256 | The credits of the job for the current period        |

### LiquidityCreditsForced

```solidity
event LiquidityCreditsForced(address _job, uint256 _rewardedAt, uint256 _currentCredits)
```

Emitted when Keep3rJobFundableLiquidity#forceLiquidityCreditsToJob function is called

| Name             | Type    | Description                                          |
| ---------------- | ------- | ---------------------------------------------------- |
| \_job            | address | The address of the job whose credits will be updated |
| \_rewardedAt     | uint256 | The time at which the job was last rewarded          |
| \_currentCredits | uint256 | The current credits of the job                       |

### JobAddition

```solidity
event JobAddition(address _job, address _jobOwner)
```

Emitted when Keep3rJobManager#addJob is called

| Name       | Type    | Description                   |
| ---------- | ------- | ----------------------------- |
| \_job      | address | The address of the job to add |
| \_jobOwner | address | The job's owner               |

### KeeperValidation

```solidity
event KeeperValidation(uint256 _gasLeft)
```

Emitted when a keeper is validated before a job

| Name      | Type    | Description                                                                        |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| \_gasLeft | uint256 | The amount of gas that the transaction has left at the moment of keeper validation |

### KeeperWork

```solidity
event KeeperWork(address _credit, address _job, address _keeper, uint256 _amount, uint256 _gasLeft)
```

Emitted when a keeper works a job

| Name      | Type    | Description                                                                     |
| --------- | ------- | ------------------------------------------------------------------------------- |
| \_credit  | address | The address of the asset in which the keeper is paid                            |
| \_job     | address | The address of the job the keeper has worked                                    |
| \_keeper  | address | The address of the keeper that has worked the job                               |
| \_amount  | uint256 | The amount that has been paid out to the keeper in exchange for working the job |
| \_gasLeft | uint256 | The amount of gas that the transaction has left at the moment of payment        |

### JobOwnershipChange

```solidity
event JobOwnershipChange(address _job, address _owner, address _pendingOwner)
```

Emitted when Keep3rJobOwnership#changeJobOwnership is called

| Name           | Type    | Description                                               |
| -------------- | ------- | --------------------------------------------------------- |
| \_job          | address | The address of the job proposed to have a change of owner |
| \_owner        | address | The current owner of the job                              |
| \_pendingOwner | address | The new address proposed to be the owner of the job       |

### JobOwnershipAssent

```solidity
event JobOwnershipAssent(address _job, address _previousOwner, address _newOwner)
```

Emitted when Keep3rJobOwnership#JobOwnershipAssent is called

| Name            | Type    | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| \_job           | address | The address of the job which the proposed owner will now own |
| \_previousOwner | address | The previous owner of the job                                |
| \_newOwner      | address | The newowner of the job                                      |

### JobMigrationRequested

```solidity
event JobMigrationRequested(address _fromJob, address _toJob)
```

Emitted when Keep3rJobMigration#migrateJob function is called

| Name      | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| \_fromJob | address | The address of the job that requests to migrate  |
| \_toJob   | address | The address at which the job requests to migrate |

### JobMigrationSuccessful

```solidity
event JobMigrationSuccessful(address _fromJob, address _toJob)
```

Emitted when Keep3rJobMigration#acceptJobMigration function is called

| Name      | Type    | Description                                           |
| --------- | ------- | ----------------------------------------------------- |
| \_fromJob | address | The address of the job that requested to migrate      |
| \_toJob   | address | The address at which the job had requested to migrate |

### JobSlashToken

```solidity
event JobSlashToken(address _job, address _token, address _slasher, uint256 _amount)
```

Emitted when Keep3rJobDisputable#slashTokenFromJob is called

| Name      | Type    | Description                                                 |
| --------- | ------- | ----------------------------------------------------------- |
| \_job     | address | The address of the job from which the token will be slashed |
| \_token   | address | The address of the token being slashed                      |
| \_slasher | address | The user that slashes the token                             |
| \_amount  | uint256 | The amount of the token being slashed                       |

### JobSlashLiquidity

```solidity
event JobSlashLiquidity(address _job, address _liquidity, address _slasher, uint256 _amount)
```

Emitted when Keep3rJobDisputable#slashLiquidityFromJob is called

| Name        | Type    | Description                                                     |
| ----------- | ------- | --------------------------------------------------------------- |
| \_job       | address | The address of the job from which the liquidity will be slashed |
| \_liquidity | address | The address of the liquidity being slashed                      |
| \_slasher   | address | The user that slashes the liquidity                             |
| \_amount    | uint256 | The amount of the liquidity being slashed                       |

### Dispute

```solidity
event Dispute(address _jobOrKeeper, address _disputer)
```

Emitted when a keeper or a job is disputed

| Name          | Type    | Description                                               |
| ------------- | ------- | --------------------------------------------------------- |
| \_jobOrKeeper | address | The address of the disputed keeper/job                    |
| \_disputer    | address | The user that called the function and disputed the keeper |

### Resolve

```solidity
event Resolve(address _jobOrKeeper, address _resolver)
```

Emitted when a dispute is resolved

| Name          | Type    | Description                                                |
| ------------- | ------- | ---------------------------------------------------------- |
| \_jobOrKeeper | address | The address of the disputed keeper/job                     |
| \_resolver    | address | The user that called the function and resolved the dispute |

### MinRewardPeriod

```solidity
error MinRewardPeriod()
```

Throws if the reward period is less than the minimum reward period time

### Disputed

```solidity
error Disputed()
```

Throws if either a job or a keeper is disputed

### BondsUnexistent

```solidity
error BondsUnexistent()
```

Throws if there are no bonded assets

### BondsLocked

```solidity
error BondsLocked()
```

Throws if the time required to bond an asset has not passed yet

### UnbondsUnexistent

```solidity
error UnbondsUnexistent()
```

Throws if there are no bonds to withdraw

### UnbondsLocked

```solidity
error UnbondsLocked()
```

Throws if the time required to withdraw the bonds has not passed yet

### SlasherExistent

```solidity
error SlasherExistent()
```

Throws if the address is already a registered slasher

### SlasherUnexistent

```solidity
error SlasherUnexistent()
```

Throws if caller is not a registered slasher

### DisputerExistent

```solidity
error DisputerExistent()
```

Throws if the address is already a registered disputer

### DisputerUnexistent

```solidity
error DisputerUnexistent()
```

Throws if caller is not a registered disputer

### OnlySlasher

```solidity
error OnlySlasher()
```

Throws if the msg.sender is not a slasher or is not a part of governance

### OnlyDisputer

```solidity
error OnlyDisputer()
```

Throws if the msg.sender is not a disputer or is not a part of governance

### JobUnavailable

```solidity
error JobUnavailable()
```

Throws when an address is passed as a job, but that address is not a job

### JobDisputed

```solidity
error JobDisputed()
```

Throws when an action that requires an undisputed job is applied on a disputed job

### AlreadyAJob

```solidity
error AlreadyAJob()
```

Throws when the address that is trying to register as a job is already a job

### TokenUnallowed

```solidity
error TokenUnallowed()
```

Throws when the token is KP3R, as it should not be used for direct token payments

### JobTokenCreditsLocked

```solidity
error JobTokenCreditsLocked()
```

Throws when the token withdraw cooldown has not yet passed

### InsufficientJobTokenCredits

```solidity
error InsufficientJobTokenCredits()
```

Throws when the user tries to withdraw more tokens than it has

### JobAlreadyAdded

```solidity
error JobAlreadyAdded()
```

Throws when trying to add a job that has already been added

### AlreadyAKeeper

```solidity
error AlreadyAKeeper()
```

Throws when the address that is trying to register as a keeper is already a keeper

### LiquidityPairApproved

```solidity
error LiquidityPairApproved()
```

Throws when the liquidity being approved has already been approved

### LiquidityPairUnexistent

```solidity
error LiquidityPairUnexistent()
```

Throws when the liquidity being removed has not been approved

### LiquidityPairUnapproved

```solidity
error LiquidityPairUnapproved()
```

Throws when trying to add liquidity to an unapproved pool

### JobLiquidityUnexistent

```solidity
error JobLiquidityUnexistent()
```

Throws when the job doesn't have the requested liquidity

### JobLiquidityInsufficient

```solidity
error JobLiquidityInsufficient()
```

Throws when trying to remove more liquidity than the job has

### JobLiquidityLessThanMin

```solidity
error JobLiquidityLessThanMin()
```

Throws when trying to add less liquidity than the minimum liquidity required

### ZeroAddress

```solidity
error ZeroAddress()
```

Throws if a variable is assigned to the zero address

### JobUnapproved

```solidity
error JobUnapproved()
```

Throws if the address claiming to be a job is not in the list of approved jobs

### InsufficientFunds

```solidity
error InsufficientFunds()
```

Throws if the amount of funds in the job is less than the payment that must be paid to the keeper that works that job

### OnlyJobOwner

```solidity
error OnlyJobOwner()
```

Throws when the caller of the function is not the job owner

### OnlyPendingJobOwner

```solidity
error OnlyPendingJobOwner()
```

Throws when the caller of the function is not the pending job owner

### JobMigrationImpossible

```solidity
error JobMigrationImpossible()
```

Throws when the address of the job that requests to migrate wants to migrate to its same address

### JobMigrationUnavailable

```solidity
error JobMigrationUnavailable()
```

Throws when the \_toJob address differs from the address being tracked in the pendingJobMigrations mapping

### JobMigrationLocked

```solidity
error JobMigrationLocked()
```

Throws when cooldown between migrations has not yet passed

### JobTokenUnexistent

```solidity
error JobTokenUnexistent()
```

Throws when the token trying to be slashed doesn't exist

### JobTokenInsufficient

```solidity
error JobTokenInsufficient()
```

Throws when someone tries to slash more tokens than the job has

### AlreadyDisputed

```solidity
error AlreadyDisputed()
```

Throws when a job or keeper is already disputed

### NotDisputed

```solidity
error NotDisputed()
```

Throws when a job or keeper is not disputed and someone tries to resolve the dispute

### keep3rHelper

```solidity
function keep3rHelper() external view returns (address _keep3rHelper)
```

Address of Keep3rHelper's contract

| Name           | Type    | Description                            |
| -------------- | ------- | -------------------------------------- |
| \_keep3rHelper | address | The address of Keep3rHelper's contract |

### keep3rV1

```solidity
function keep3rV1() external view returns (address _keep3rV1)
```

Address of Keep3rV1's contract

| Name       | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| \_keep3rV1 | address | The address of Keep3rV1's contract |

### keep3rV1Proxy

```solidity
function keep3rV1Proxy() external view returns (address _keep3rV1Proxy)
```

Address of Keep3rV1Proxy's contract

| Name            | Type    | Description                             |
| --------------- | ------- | --------------------------------------- |
| \_keep3rV1Proxy | address | The address of Keep3rV1Proxy's contract |

### kp3rWethPool

```solidity
function kp3rWethPool() external view returns (address _kp3rWethPool)
```

Address of the KP3R-WETH pool

| Name           | Type    | Description                   |
| -------------- | ------- | ----------------------------- |
| \_kp3rWethPool | address | The address of KP3R-WETH pool |

### bondTime

```solidity
function bondTime() external view returns (uint256 _days)
```

The amount of time required to pass after a keeper has bonded assets for it to be able to activate

| Name   | Type    | Description                   |
| ------ | ------- | ----------------------------- |
| \_days | uint256 | The required bondTime in days |

### unbondTime

```solidity
function unbondTime() external view returns (uint256 _days)
```

The amount of time required to pass before a keeper can unbond what he has bonded

| Name   | Type    | Description                     |
| ------ | ------- | ------------------------------- |
| \_days | uint256 | The required unbondTime in days |

### liquidityMinimum

```solidity
function liquidityMinimum() external view returns (uint256 _amount)
```

The minimum amount of liquidity required to fund a job per liquidity

| Name     | Type    | Description                             |
| -------- | ------- | --------------------------------------- |
| \_amount | uint256 | The minimum amount of liquidity in KP3R |

### rewardPeriodTime

```solidity
function rewardPeriodTime() external view returns (uint256 _days)
```

The amount of time between each scheduled credits reward given to a job

| Name   | Type    | Description               |
| ------ | ------- | ------------------------- |
| \_days | uint256 | The reward period in days |

### inflationPeriod

```solidity
function inflationPeriod() external view returns (uint256 _period)
```

The inflation period is the denominator used to regulate the emission of KP3R

| Name     | Type    | Description                                           |
| -------- | ------- | ----------------------------------------------------- |
| \_period | uint256 | The denominator used to regulate the emission of KP3R |

### fee

```solidity
function fee() external view returns (uint256 _amount)
```

The fee to be sent to governance when a user adds liquidity to a job

| Name     | Type    | Description                                                                 |
| -------- | ------- | --------------------------------------------------------------------------- |
| \_amount | uint256 | The fee amount to be sent to governance when a user adds liquidity to a job |

### BASE

```solidity
function BASE() external view returns (uint256 _base)
```

The base that will be used to calculate the fee

| Name   | Type    | Description                                     |
| ------ | ------- | ----------------------------------------------- |
| \_base | uint256 | The base that will be used to calculate the fee |

### MIN_REWARD_PERIOD_TIME

```solidity
function MIN_REWARD_PERIOD_TIME() external view returns (uint256 _minPeriod)
```

The minimum rewardPeriodTime value to be set

| Name        | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| \_minPeriod | uint256 | The minimum reward period in seconds |

### slashers

```solidity
function slashers(address _slasher) external view returns (bool _isSlasher)
```

Maps an address to a boolean to determine whether the address is a slasher or not.

| Name        | Type | Description                             |
| ----------- | ---- | --------------------------------------- |
| \_isSlasher | bool | Whether the address is a slasher or not |

### disputers

```solidity
function disputers(address _disputer) external view returns (bool _isDisputer)
```

Maps an address to a boolean to determine whether the address is a disputer or not.

| Name         | Type | Description                              |
| ------------ | ---- | ---------------------------------------- |
| \_isDisputer | bool | Whether the address is a disputer or not |

### workCompleted

```solidity
function workCompleted(address _keeper) external view returns (uint256 _workCompleted)
```

Tracks the total KP3R earnings of a keeper since it started working

| Name            | Type    | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| \_workCompleted | uint256 | Total KP3R earnings of a keeper since it started working |

### firstSeen

```solidity
function firstSeen(address _keeper) external view returns (uint256 _timestamp)
```

Tracks when a keeper was first registered

| Name        | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
| \_timestamp | uint256 | The time at which the keeper was first registered |

### disputes

```solidity
function disputes(address _keeperOrJob) external view returns (bool _disputed)
```

Tracks if a keeper or job has a pending dispute

| Name       | Type | Description                                   |
| ---------- | ---- | --------------------------------------------- |
| \_disputed | bool | Whether a keeper or job has a pending dispute |

### dispute

```solidity
function dispute(address _jobOrKeeper) external
```

Allows governance to create a dispute for a given keeper/job

| Name          | Type    | Description            |
| ------------- | ------- | ---------------------- |
| \_jobOrKeeper | address | The address in dispute |

### resolve

```solidity
function resolve(address _jobOrKeeper) external
```

Allows governance to resolve a dispute on a keeper/job

| Name          | Type    | Description         |
| ------------- | ------- | ------------------- |
| \_jobOrKeeper | address | The address cleared |

### bonds

```solidity
function bonds(address _keeper, address _bond) external view returns (uint256 _bonds)
```

Tracks how much a keeper has bonded of a certain token

| Name    | Type    | Description                                        |
| ------- | ------- | -------------------------------------------------- |
| \_bonds | uint256 | Amount of a certain token that a keeper has bonded |

### jobTokenCredits

```solidity
function jobTokenCredits(address _job, address _token) external view returns (uint256 _amount)
```

The current token credits available for a job

| Name     | Type    | Description                                     |
| -------- | ------- | ----------------------------------------------- |
| \_amount | uint256 | The amount of token credits available for a job |

### pendingBonds

```solidity
function pendingBonds(address _keeper, address _bonding) external view returns (uint256 _pendingBonds)
```

Tracks the amount of assets deposited in pending bonds

| Name           | Type    | Description                                      |
| -------------- | ------- | ------------------------------------------------ |
| \_pendingBonds | uint256 | Amount of a certain asset a keeper has unbonding |

### canActivateAfter

```solidity
function canActivateAfter(address _keeper, address _bonding) external view returns (uint256 _timestamp)
```

Tracks when a bonding for a keeper can be activated

| Name        | Type    | Description                                             |
| ----------- | ------- | ------------------------------------------------------- |
| \_timestamp | uint256 | Time at which the bonding for a keeper can be activated |

### canWithdrawAfter

```solidity
function canWithdrawAfter(address _keeper, address _bonding) external view returns (uint256 _timestamp)
```

Tracks when keeper bonds are ready to be withdrawn

| Name        | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| \_timestamp | uint256 | Time at which the keeper bonds are ready to be withdrawn |

### pendingUnbonds

```solidity
function pendingUnbonds(address _keeper, address _bonding) external view returns (uint256 _pendingUnbonds)
```

Tracks how much keeper bonds are to be withdrawn

| Name             | Type    | Description                                         |
| ---------------- | ------- | --------------------------------------------------- |
| \_pendingUnbonds | uint256 | The amount of keeper bonds that are to be withdrawn |

### hasBonded

```solidity
function hasBonded(address _keeper) external view returns (bool _hasBonded)
```

Checks whether the address has ever bonded an asset

| Name        | Type | Description                                  |
| ----------- | ---- | -------------------------------------------- |
| \_hasBonded | bool | Whether the address has ever bonded an asset |

### jobTokenCreditsAddedAt

```solidity
function jobTokenCreditsAddedAt(address _job, address _token) external view returns (uint256 _timestamp)
```

Last block where tokens were added to the job [job => token => timestamp]

| Name        | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
| \_timestamp | uint256 | The last block where tokens were added to the job |

### addTokenCreditsToJob

```solidity
function addTokenCreditsToJob(address _job, address _token, uint256 _amount) external
```

Add credit to a job to be paid out for work

| Name     | Type    | Description                             |
| -------- | ------- | --------------------------------------- |
| \_job    | address | The address of the job being credited   |
| \_token  | address | The address of the token being credited |
| \_amount | uint256 | The amount of credit being added        |

### withdrawTokenCreditsFromJob

```solidity
function withdrawTokenCreditsFromJob(address _job, address _token, uint256 _amount, address _receiver) external
```

Withdraw credit from a job

| Name       | Type    | Description                                                 |
| ---------- | ------- | ----------------------------------------------------------- |
| \_job      | address | The address of the job from which the credits are withdrawn |
| \_token    | address | The address of the token being withdrawn                    |
| \_amount   | uint256 | The amount of token to be withdrawn                         |
| \_receiver | address | The user that will receive tokens                           |

### approvedLiquidities

```solidity
function approvedLiquidities() external view returns (address[] _list)
```

Lists liquidity pairs

| Name   | Type      | Description                                                 |
| ------ | --------- | ----------------------------------------------------------- |
| \_list | address[] | An array of addresses with all the approved liquidity pairs |

### liquidityAmount

```solidity
function liquidityAmount(address _job, address _liquidity) external view returns (uint256 _amount)
```

Amount of liquidity in a specified job

| Name        | Type    | Description                                  |
| ----------- | ------- | -------------------------------------------- |
| \_job       | address | The address of the job being checked         |
| \_liquidity | address | The address of the liquidity we are checking |

| Name     | Type    | Description                              |
| -------- | ------- | ---------------------------------------- |
| \_amount | uint256 | Amount of liquidity in the specified job |

### rewardedAt

```solidity
function rewardedAt(address _job) external view returns (uint256 _timestamp)
```

Last time the job was rewarded liquidity credits

| Name  | Type    | Description                          |
| ----- | ------- | ------------------------------------ |
| \_job | address | The address of the job being checked |

| Name        | Type    | Description                                                       |
| ----------- | ------- | ----------------------------------------------------------------- |
| \_timestamp | uint256 | Timestamp of the last time the job was rewarded liquidity credits |

### workedAt

```solidity
function workedAt(address _job) external view returns (uint256 _timestamp)
```

Last time the job was worked

| Name  | Type    | Description                          |
| ----- | ------- | ------------------------------------ |
| \_job | address | The address of the job being checked |

| Name        | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| \_timestamp | uint256 | Timestamp of the last time the job was worked |

### jobOwner

```solidity
function jobOwner(address _job) external view returns (address _owner)
```

Maps the job to the owner of the job (job => user)

| Name    | Type    | Description                        |
| ------- | ------- | ---------------------------------- |
| \_owner | address | The addres of the owner of the job |

### jobPendingOwner

```solidity
function jobPendingOwner(address _job) external view returns (address _pendingOwner)
```

Maps the owner of the job to its pending owner (job => user)

| Name           | Type    | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| \_pendingOwner | address | The address of the pending owner of the job |

### pendingJobMigrations

```solidity
function pendingJobMigrations(address _fromJob) external view returns (address _toJob)
```

Maps the jobs that have requested a migration to the address they have requested to migrate to

| Name    | Type    | Description                                              |
| ------- | ------- | -------------------------------------------------------- |
| \_toJob | address | The address to which the job has requested to migrate to |

### setKeep3rHelper

```solidity
function setKeep3rHelper(address _keep3rHelper) external
```

Sets the Keep3rHelper address

| Name           | Type    | Description              |
| -------------- | ------- | ------------------------ |
| \_keep3rHelper | address | The Keep3rHelper address |

### setKeep3rV1

```solidity
function setKeep3rV1(address _keep3rV1) external
```

Sets the Keep3rV1 address

| Name       | Type    | Description          |
| ---------- | ------- | -------------------- |
| \_keep3rV1 | address | The Keep3rV1 address |

### setKeep3rV1Proxy

```solidity
function setKeep3rV1Proxy(address _keep3rV1Proxy) external
```

Sets the Keep3rV1Proxy address

| Name            | Type    | Description               |
| --------------- | ------- | ------------------------- |
| \_keep3rV1Proxy | address | The Keep3rV1Proxy address |

### setKp3rWethPool

```solidity
function setKp3rWethPool(address _kp3rWethPool) external
```

Sets the KP3R-WETH pool address

| Name           | Type    | Description                |
| -------------- | ------- | -------------------------- |
| \_kp3rWethPool | address | The KP3R-WETH pool address |

### setBondTime

```solidity
function setBondTime(uint256 _bond) external
```

Sets the bond time required to activate as a keeper

| Name   | Type    | Description       |
| ------ | ------- | ----------------- |
| \_bond | uint256 | The new bond time |

### setUnbondTime

```solidity
function setUnbondTime(uint256 _unbond) external
```

Sets the unbond time required unbond what has been bonded

| Name     | Type    | Description         |
| -------- | ------- | ------------------- |
| \_unbond | uint256 | The new unbond time |

### setLiquidityMinimum

```solidity
function setLiquidityMinimum(uint256 _liquidityMinimum) external
```

Sets the minimum amount of liquidity required to fund a job

| Name               | Type    | Description                         |
| ------------------ | ------- | ----------------------------------- |
| \_liquidityMinimum | uint256 | The new minimum amount of liquidity |

### setRewardPeriodTime

```solidity
function setRewardPeriodTime(uint256 _rewardPeriodTime) external
```

Sets the time required to pass between rewards for jobs

| Name               | Type    | Description                                             |
| ------------------ | ------- | ------------------------------------------------------- |
| \_rewardPeriodTime | uint256 | The new amount of time required to pass between rewards |

### setInflationPeriod

```solidity
function setInflationPeriod(uint256 _inflationPeriod) external
```

Sets the new inflation period

| Name              | Type    | Description              |
| ----------------- | ------- | ------------------------ |
| \_inflationPeriod | uint256 | The new inflation period |

### setFee

```solidity
function setFee(uint256 _fee) external
```

Sets the new fee

| Name  | Type    | Description |
| ----- | ------- | ----------- |
| \_fee | uint256 | The new fee |

### addSlasher

```solidity
function addSlasher(address _slasher) external
```

Registers a slasher by updating the slashers mapping

### removeSlasher

```solidity
function removeSlasher(address _slasher) external
```

Removes a slasher by updating the slashers mapping

### addDisputer

```solidity
function addDisputer(address _disputer) external
```

Registers a disputer by updating the disputers mapping

### removeDisputer

```solidity
function removeDisputer(address _disputer) external
```

Removes a disputer by updating the disputers mapping

### jobs

```solidity
function jobs() external view returns (address[] _jobList)
```

Lists all jobs

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| \_jobList | address[] | Array with all the jobs in \_jobs |

### keepers

```solidity
function keepers() external view returns (address[] _keeperList)
```

Lists all keepers

| Name         | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| \_keeperList | address[] | Array with all the jobs in keepers |

### bond

```solidity
function bond(address _bonding, uint256 _amount) external
```

Beginning of the bonding process

| Name      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| \_bonding | address | The asset being bound                   |
| \_amount  | uint256 | The amount of bonding asset being bound |

### unbond

```solidity
function unbond(address _bonding, uint256 _amount) external
```

Beginning of the unbonding process

| Name      | Type    | Description                  |
| --------- | ------- | ---------------------------- |
| \_bonding | address | The asset being unbound      |
| \_amount  | uint256 | Allows for partial unbonding |

### activate

```solidity
function activate(address _bonding) external
```

End of the bonding process after bonding time has passed

| Name      | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| \_bonding | address | The asset being activated as bond collateral |

### withdraw

```solidity
function withdraw(address _bonding) external
```

Withdraw funds after unbonding has finished

| Name      | Type    | Description                                 |
| --------- | ------- | ------------------------------------------- |
| \_bonding | address | The asset to withdraw from the bonding pool |

### slash

```solidity
function slash(address _keeper, address _bonded, uint256 _amount) external
```

Allows governance to slash a keeper based on a dispute

| Name     | Type    | Description               |
| -------- | ------- | ------------------------- |
| \_keeper | address | The address being slashed |
| \_bonded | address | The asset being slashed   |
| \_amount | uint256 | The amount being slashed  |

### revoke

```solidity
function revoke(address _keeper) external
```

Blacklists a keeper from participating in the network

| Name     | Type    | Description               |
| -------- | ------- | ------------------------- |
| \_keeper | address | The address being slashed |

### addJob

```solidity
function addJob(address _job) external
```

Allows any caller to add a new job

| Name  | Type    | Description                                                |
| ----- | ------- | ---------------------------------------------------------- |
| \_job | address | Address of the contract for which work should be performed |

### jobLiquidityCredits

```solidity
function jobLiquidityCredits(address _job) external view returns (uint256 _amount)
```

Returns the liquidity credits of a given job

| Name  | Type    | Description                                                           |
| ----- | ------- | --------------------------------------------------------------------- |
| \_job | address | The address of the job of which we want to know the liquidity credits |

| Name     | Type    | Description                          |
| -------- | ------- | ------------------------------------ |
| \_amount | uint256 | The liquidity credits of a given job |

### jobPeriodCredits

```solidity
function jobPeriodCredits(address _job) external view returns (uint256 _amount)
```

Returns the credits of a given job for the current period

| Name  | Type    | Description                                                        |
| ----- | ------- | ------------------------------------------------------------------ |
| \_job | address | The address of the job of which we want to know the period credits |

| Name     | Type    | Description                                         |
| -------- | ------- | --------------------------------------------------- |
| \_amount | uint256 | The credits the given job has at the current period |

### totalJobCredits

```solidity
function totalJobCredits(address _job) external view returns (uint256 _amount)
```

Calculates the total credits of a given job

| Name  | Type    | Description                                                       |
| ----- | ------- | ----------------------------------------------------------------- |
| \_job | address | The address of the job of which we want to know the total credits |

| Name     | Type    | Description                        |
| -------- | ------- | ---------------------------------- |
| \_amount | uint256 | The total credits of the given job |

### quoteLiquidity

```solidity
function quoteLiquidity(address _liquidity, uint256 _amount) external view returns (uint256 _periodCredits)
```

Calculates how many credits should be rewarded periodically for a given liquidity amount

\__periodCredits = underlying KP3Rs for given liquidity amount \* rewardPeriod / inflationPeriod_

| Name        | Type    | Description                        |
| ----------- | ------- | ---------------------------------- |
| \_liquidity | address | The liquidity to provide           |
| \_amount    | uint256 | The amount of liquidity to provide |

| Name            | Type    | Description                                                    |
| --------------- | ------- | -------------------------------------------------------------- |
| \_periodCredits | uint256 | The amount of KP3R periodically minted for the given liquidity |

### observeLiquidity

```solidity
function observeLiquidity(address _liquidity) external view returns (struct IKeep3rV2.TickCache _tickCache)
```

Observes the current state of the liquidity pair being observed and updates TickCache with the information

| Name        | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| \_liquidity | address | The liquidity pair being observed |

| Name        | Type                       | Description           |
| ----------- | -------------------------- | --------------------- |
| \_tickCache | struct IKeep3rV2.TickCache | The updated TickCache |

### forceLiquidityCreditsToJob

```solidity
function forceLiquidityCreditsToJob(address _job, uint256 _amount) external
```

Gifts liquidity credits to the specified job

| Name     | Type    | Description                             |
| -------- | ------- | --------------------------------------- |
| \_job    | address | The address of the job being credited   |
| \_amount | uint256 | The amount of liquidity credits to gift |

### approveLiquidity

```solidity
function approveLiquidity(address _liquidity) external
```

Approve a liquidity pair for being accepted in future

| Name        | Type    | Description                           |
| ----------- | ------- | ------------------------------------- |
| \_liquidity | address | The address of the liquidity accepted |

### revokeLiquidity

```solidity
function revokeLiquidity(address _liquidity) external
```

Revoke a liquidity pair from being accepted in future

| Name        | Type    | Description                      |
| ----------- | ------- | -------------------------------- |
| \_liquidity | address | The liquidity no longer accepted |

### addLiquidityToJob

```solidity
function addLiquidityToJob(address _job, address _liquidity, uint256 _amount) external
```

Allows anyone to fund a job with liquidity

| Name        | Type    | Description                                   |
| ----------- | ------- | --------------------------------------------- |
| \_job       | address | The address of the job to assign liquidity to |
| \_liquidity | address | The liquidity being added                     |
| \_amount    | uint256 | The amount of liquidity tokens to add         |

### unbondLiquidityFromJob

```solidity
function unbondLiquidityFromJob(address _job, address _liquidity, uint256 _amount) external
```

Unbond liquidity for a job

_Can only be called by the job's owner_

| Name        | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| \_job       | address | The address of the job being unbound from |
| \_liquidity | address | The liquidity being unbound               |
| \_amount    | uint256 | The amount of liquidity being removed     |

### withdrawLiquidityFromJob

```solidity
function withdrawLiquidityFromJob(address _job, address _liquidity, address _receiver) external
```

Withdraw liquidity from a job

| Name        | Type    | Description                                           |
| ----------- | ------- | ----------------------------------------------------- |
| \_job       | address | The address of the job being withdrawn from           |
| \_liquidity | address | The liquidity being withdrawn                         |
| \_receiver  | address | The address that will receive the withdrawn liquidity |

### isKeeper

```solidity
function isKeeper(address _keeper) external returns (bool _isKeeper)
```

Confirms if the current keeper is registered, can be used for general (non critical) functions

| Name     | Type    | Description                   |
| -------- | ------- | ----------------------------- |
| \_keeper | address | The keeper being investigated |

| Name       | Type | Description                                                  |
| ---------- | ---- | ------------------------------------------------------------ |
| \_isKeeper | bool | Whether the address passed as a parameter is a keeper or not |

### isBondedKeeper

```solidity
function isBondedKeeper(address _keeper, address _bond, uint256 _minBond, uint256 _earned, uint256 _age) external returns (bool _isBondedKeeper)
```

Confirms if the current keeper is registered and has a minimum bond of any asset. Should be used for protected functions

| Name      | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| \_keeper  | address | The keeper to check                              |
| \_bond    | address | The bond token being evaluated                   |
| \_minBond | uint256 | The minimum amount of bonded tokens              |
| \_earned  | uint256 | The minimum funds earned in the keepers lifetime |
| \_age     | uint256 | The minimum keeper age required                  |

| Name             | Type | Description                                        |
| ---------------- | ---- | -------------------------------------------------- |
| \_isBondedKeeper | bool | Whether the `_keeper` meets the given requirements |

### worked

```solidity
function worked(address _keeper) external
```

Implemented by jobs to show that a keeper performed work

_Automatically calculates the payment for the keeper_

| Name     | Type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| \_keeper | address | Address of the keeper that performed the work |

### bondedPayment

```solidity
function bondedPayment(address _keeper, uint256 _payment) external
```

Implemented by jobs to show that a keeper performed work

_Pays the keeper that performs the work with KP3R_

| Name      | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| \_keeper  | address | Address of the keeper that performed the work   |
| \_payment | uint256 | The reward that should be allocated for the job |

### directTokenPayment

```solidity
function directTokenPayment(address _token, address _keeper, uint256 _amount) external
```

Implemented by jobs to show that a keeper performed work

_Pays the keeper that performs the work with a specific token_

| Name     | Type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| \_token  | address | The asset being awarded to the keeper         |
| \_keeper | address | Address of the keeper that performed the work |
| \_amount | uint256 | The reward that should be allocated           |

### changeJobOwnership

```solidity
function changeJobOwnership(address _job, address _newOwner) external
```

Proposes a new address to be the owner of the job

### acceptJobOwnership

```solidity
function acceptJobOwnership(address _job) external
```

The proposed address accepts to be the owner of the job

### migrateJob

```solidity
function migrateJob(address _fromJob, address _toJob) external
```

Initializes the migration process for a job by adding the request to the pendingJobMigrations mapping

| Name      | Type    | Description                                           |
| --------- | ------- | ----------------------------------------------------- |
| \_fromJob | address | The address of the job that is requesting to migrate  |
| \_toJob   | address | The address at which the job is requesting to migrate |

### acceptJobMigration

```solidity
function acceptJobMigration(address _fromJob, address _toJob) external
```

Completes the migration process for a job

_Unbond/withdraw process doesn't get migrated_

| Name      | Type    | Description                                      |
| --------- | ------- | ------------------------------------------------ |
| \_fromJob | address | The address of the job that requested to migrate |
| \_toJob   | address | The address to which the job wants to migrate to |

### slashTokenFromJob

```solidity
function slashTokenFromJob(address _job, address _token, uint256 _amount) external
```

Allows governance or slasher to slash a job specific token

| Name     | Type    | Description                                                 |
| -------- | ------- | ----------------------------------------------------------- |
| \_job    | address | The address of the job from which the token will be slashed |
| \_token  | address | The address of the token that will be slashed               |
| \_amount | uint256 | The amount of the token that will be slashed                |

### slashLiquidityFromJob

```solidity
function slashLiquidityFromJob(address _job, address _liquidity, uint256 _amount) external
```

Allows governance or a slasher to slash liquidity from a job

| Name        | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
| \_job       | address | The address being slashed                         |
| \_liquidity | address | The address of the liquidity that will be slashed |
| \_amount    | uint256 | The amount of liquidity that will be slashed      |
