# ABI Reference

The SDK exports compiled Apex ABIs from the package root.

```ts
import {
  apexControllerAbi,
  apexTokenAbi,
  apexVaultAbi,
  veApexTokenAbi,
  classicFactoryAbi,
  classicChefAbi,
  classicPoolAbi,
  clFactoryAbi,
  clMasterChefAbi,
  clPoolAbi,
  feeCenterAbi,
  feeReceiverAbi,
  feeSwapperAbi,
  interfaceMulticallAbi,
  mixedQuoterAbi,
  nonfungiblePositionManagerAbi,
  quoterAbi,
  quoterV2Abi,
  smartRouterAbi,
  swapRouterAbi,
  tickLensAbi,
} from '@apex_labs/sdk'
```

## Naming

ABI names mirror contract names:

- `ClassicFactory` -> `classicFactoryAbi`
- `CLMasterChef` -> `clMasterChefAbi`
- `NonfungiblePositionManager` -> `nonfungiblePositionManagerAbi`

## viem example

```ts
const [slot0, liquidity] = await Promise.all([
  publicClient.readContract({
    address: pool,
    abi: clPoolAbi,
    functionName: 'slot0',
  }),
  publicClient.readContract({
    address: pool,
    abi: clPoolAbi,
    functionName: 'liquidity',
  }),
])
```

## Versioning

Install a fixed SDK version in apps:

```bash
npm install @apex_labs/sdk@0.2.0
```

Update deliberately when contracts or periphery calldata changes.
