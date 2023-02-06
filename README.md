# Yearn Strategies Keeper

### Deployment

##### How to

To deploy a Keep3rJob run

```
yarn deploy --network ethereum --tags harvest-job
```

Available job-type flags:

- `harvest-job`: HarvestV2Keep3rStealthJob
- `public-harvest-job`: HarvestPublicKeep3rJob
- `tend-job`: TendV2Keep3rJob

Script will deploy and add job to Keep3rV2
