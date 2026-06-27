# ABI Exports

The SDK exports compiled ABIs so frontends do not need to copy JSON artifacts.

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

## Naming rule

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

## Keep ABIs versioned

Install a fixed SDK version in apps:

```bash
npm install @apex_labs/sdk@0.1.0
```

Update deliberately when contracts or periphery calldata changes.

