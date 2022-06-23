import { defineConfig } from '@dethcrypto/eth-sdk';

export default defineConfig({
  contracts: {
    mainnet: {
      kp3rV1: '0x1ceb5cb57c4d4e2b2433641b95dd330a33185a44',
      stealthRelayer: '0x0a61c2146a7800bdc278833f21ebf56cd660ee2a',
      stealthVault: '0xde2fe402a285363283853bec903d134426db3ff7',
      harvestV2Keep3rStealthJob: '0x2150b45626199cfa5089368bdca30cd0bfb152d6',
      v2Keeper: '0x736d7e3c5a6cb2ce3b764300140abf476f6cfccf',
      strategy: '0x6c0496fc55eb4089f1cf91a4344a2d56face51e3',
      keep3rV2Helper: '0xD36Ac9Ff5562abb541F51345f340FB650547a661',
      keep3rV2: '0xeb02addCfD8B773A5FFA6B9d1FE99c566f8c44CC',
      uniswapV3Pool: '0x8f8ef111b67c04eb1641f5ff19ee54cda062f163',
      // KP3R/WETH 1% (bug: not verified) '0x11b7a6bc0259ed6cf9db8f499988f9ecc7167bf5'
    },
  },
});
