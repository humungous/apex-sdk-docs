# Getting Started

Install the Apex SDK:

```bash
npm install @apex_labs/sdk
```

Use Node 20 or newer for application and documentation tooling.

## Protocol Surfaces

Apex has two pool families:

- **Classic pools**: pair-style AMMs with volatile and stable curves.
- **CL pools**: concentrated-liquidity pools using Pancake v3-compatible math and periphery shapes.

Apex also includes dedicated reward contracts:

- **Classic farms**: pid-based LP staking through `ClassicChef`.
- **CL farms**: NFT position staking through `CLMasterChef`.
- **ApexVault**: veNFT reward configuration, claiming, compounding, and lock extension.

## SDK Modules

The package provides:

- generated Apex contract ABIs
- deterministic address helpers for Classic and CL pools
- quote and path helpers for Classic, CL, and mixed routes
- `SmartRouter` calldata builders for swap execution through `SmartRouter`
- position and farm calldata builders for Classic LPs and CL NFTs
- `ApexVault` calldata builders for ApexVault operations

## Minimal import

```ts
import {
  CLFeeAmount,
  computeCLPoolAddress,
  computeClassicPoolAddress,
  quoteClassicExactInput,
  apexCLPoolAbi,
  apexClassicPairAbi,
} from '@apex_labs/sdk'
```

## Basic flow

1. Create an `ApexDeploymentConfig` for the chain.
2. Fetch pool, position, and reward state with `viem` or an indexed data layer.
3. Use SDK helpers to compute addresses, quote, or encode calldata.
4. Send reads and transactions through the app wallet and RPC clients.

Keep deployment addresses in app config, not components. Staging, testnet, and production should each have their own config object.

## Documentation

- [Configuration](./guide/configuration.md)
- [DEX contract structure](./contracts/overview.md)
- [Classic Pools](./contracts/classic-pools.md)
- [CL Pools](./contracts/cl-pools.md)
- [Farming](./contracts/farming.md)
- [ApexVault](./contracts/apex-vault.md)
- [Quoting examples](./examples/quoting.md)
- [Swap examples](./examples/swaps.md)
- [SDK API reference](./reference/sdk-api.md)
