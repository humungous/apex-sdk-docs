# Getting Started

Install the SDK:

```bash
npm install @apex_labs/sdk
```

Use Node 20+ for local tooling when possible. Some transitive dependencies warn on Node 18.

## The mental model

Apex has two pool families:

- **Classic pools**: pair-style AMMs with volatile and stable curves.
- **CL pools**: concentrated-liquidity pools using Pancake v3-compatible math and periphery shapes.

The SDK gives frontend code four things:

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

The SDK does not store deployed addresses for you. Keep deployment addresses in your app config so staging, testnet, and production can stay separate.
