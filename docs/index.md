# Apex SDK

Install the Apex SDK:

```bash
npm install @apex_labs/sdk
```

Use Node 20 or newer for application and documentation tooling.

## Primary API Areas

Start with the reference pages for the code surface:

- [Config and Types](./reference/config-types.md)
- [CL Pools](./reference/cl-pools.md)
- [Classic Pools](./reference/classic-pools.md)
- [Routes and Quotes](./reference/routes-quotes.md)
- [SmartRouter](./reference/smart-router.md)
- [Farming](./reference/farming.md)
- [ApexVault](./reference/apex-vault.md)
- [ABI Exports](./reference/abis.md)

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

1. Create an `ApexDeploymentConfig` for the chain.
2. Fetch pool, position, and reward state with `viem` or an indexed data layer.
3. Use SDK helpers to compute addresses, quote, or encode calldata.
4. Send reads and transactions through the app wallet and RPC clients.

Keep deployment addresses in app config, not components. Staging, testnet, and production should each have their own config object.

## Supporting Guides

- [SDK API reference](./reference/sdk-api.md)
- [Configuration](./guide/configuration.md)
- [Quoting examples](./examples/quoting.md)
- [Swap examples](./examples/swaps.md)
- [Contract map](./contracts/overview.md)
