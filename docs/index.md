# Getting Started

Install the SDK:

```bash
npm install @apex_labs/sdk
```

Use Node 20+ for local tooling when possible. Some transitive dependencies warn on Node 18.

## What the SDK is for

Apex has two pool families:

- **Classic pools**: pair-style AMMs with volatile and stable curves.
- **CL pools**: concentrated-liquidity pools using Pancake v3-compatible math and periphery shapes.

The SDK gives frontend code the pieces it should not hand-roll:

- exact contract ABIs generated from Apex contracts
- address helpers for Classic and CL pools
- quote/path helpers for Classic, CL, and mixed routes
- SmartRouter calldata builders for user-facing swaps
- calldata builders for LP actions, farming, and vault actions

## Minimal import

```ts
import {
  ApexFeeAmount,
  computeCLPoolAddress,
  computeClassicPoolAddress,
  quoteApexClassicExactInput,
  apexCLPoolAbi,
  apexClassicPairAbi,
} from '@apex_labs/sdk'
```

## Basic flow

1. Create an `ApexDeploymentConfig` for the chain.
2. Fetch pool state with `viem` or your data layer.
3. Use SDK helpers to compute addresses, quote, or encode calldata.
4. Send reads/writes through your wallet and RPC client.

Keep deployment addresses in app config, not components. Staging, testnet, and production should each have their own config object.

## Next

- [Configuration](./guide/configuration.md)
- [DEX contract structure](./contracts/overview.md)
- [Quoting examples](./examples/quoting.md)
- [Swap examples](./examples/swaps.md)
- [SDK API reference](./reference/sdk-api.md)

