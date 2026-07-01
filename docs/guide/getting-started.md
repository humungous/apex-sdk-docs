# Getting Started

Install the Apex SDK:

```bash
npm install @apex_labs/sdk
```

Use Node 20 or newer for application and documentation tooling.

## Primary API Areas

The SDK is organized around the actions applications need to perform:

- [Config and Types](../reference/config-types.md)
- [CL Pools](../reference/cl-pools.md)
- [Classic Pools](../reference/classic-pools.md)
- [Routes and Quotes](../reference/routes-quotes.md)
- [SmartRouter](../reference/smart-router.md)
- [Farming](../reference/farming.md)
- [ApexVault](../reference/apex-vault.md)

## Minimal import

```ts
import {
  CLFeeAmount,
  computeCLPoolAddress,
  computeClassicPoolAddress,
  quoteClassicExactInput,
  clPoolAbi,
  classicPoolAbi,
} from '@apex_labs/sdk'
```

## Basic flow

1. Import `apexMegaEthTest` or create an `ApexDeploymentConfig` for the chain.
2. Fetch pool, position, and reward state with `viem` or an indexed data layer.
3. Use SDK helpers to compute addresses, quote, or encode calldata.
4. Send reads and transactions through the app wallet and RPC clients.

```ts
import { apexMegaEthTest } from '@apex_labs/sdk'

export const apex = apexMegaEthTest
```

Keep custom deployment addresses in your app config so staging, testnet, and production can stay separate.
