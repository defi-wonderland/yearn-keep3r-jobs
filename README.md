# Yearn Strategies Keeper

> ⚠️ **DEPRECATED – DO NOT USE**
>
> This repository is no longer maintained and is **deprecated**.
>
> It may contain **outdated, insecure, or vulnerable code** and should **not** be used in production or as a dependency in any project.
>
> The repository is retained solely for historical reference. No support, updates, or security patches will be provided.

### Deployment

##### How to

To deploy a v2Keep3rJob run

```
yarn deploy --network ethereum --tags harvest-job
```

Available job-type flags:

- `harvest-job`: HarvestV2Keep3rStealthJob
- `tend-job`: TendV2Keep3rJob

Script will deploy and add job to Keep3rV2
