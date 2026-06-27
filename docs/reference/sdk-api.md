# SDK API Reference

This page lists the exports frontend developers usually need. Use TypeScript autocomplete for exact parameter types.

## Config and constants

| Export | Purpose |
| --- | --- |
| `ApexDeploymentConfig` | App-level deployment config per chain |
| `ApexFeeAmount` | Apex CL fee tiers |
| `APEX_CL_TICK_SPACINGS` | Tick spacing per CL fee tier |
| `APEX_CL_POOL_INIT_CODE_HASH` | Default CL init code hash |
| `APEX_CLASSIC_PAIR_INIT_CODE_HASH` | Default Classic pair init code hash |
| `APEX_CLASSIC_FEE_DENOMINATOR` | Classic fee denominator, `1_000_000` |
| `APEX_CL_PROTOCOL_FEE_DENOMINATOR` | CL protocol fee denominator, `10_000` |

## Pool helpers

| Export | Purpose |
| --- | --- |
| `computeCLPoolAddress` | Compute deterministic CL pool address |
| `computeApexCLPoolAddress` | Alias for `computeCLPoolAddress` |
| `createApexPool` | Create a Pancake-compatible `Pool` with Apex fee tiers |
| `getApexTickSpacing` | Resolve tick spacing for an Apex fee tier |
| `computeClassicPoolAddress` | Compute deterministic Classic pair address |
| `computeApexClassicPairAddress` | Alias for `computeClassicPoolAddress` |
| `quoteApexClassicExactInput` | Local Classic exact-input quote from reserves |

## Mixed routing

| Export | Purpose |
| --- | --- |
| `ApexMixedRouteHop` | Route hop type for Classic/CL mixed paths |
| `encodeApexMixedRouteToPath` | Encode mixed route path bytes |
| `decodeApexMixedRoutePath` | Decode mixed route path bytes |
| `encodeApexMixedRouteToPancakeQuoteParams` | Encode path and flags for Pancake-style mixed quote provider |

## Swap calldata

| Export | Purpose |
| --- | --- |
| `ApexSmartRouter` | Builds SmartRouter calldata for Classic, CL, stable, and mixed swaps |
| `ApexSmartRouter.swapCallParameters` | Wrap custom router calls in one router multicall |
| `ApexSmartRouter.mixedExactInputCallParameters` | Main helper for mixed exact-input user swaps |
| `ApexSmartRouter.exactInputCallParameters` | CL exact-input segment |
| `ApexSmartRouter.classicExactInputCallParameters` | Classic volatile segment |
| `ApexSmartRouter.stableExactInputCallParameters` | Classic stable segment |

## Farming and vault

| Export | Purpose |
| --- | --- |
| `ApexClassicFarm` | Classic Chef deposit/withdraw/harvest calldata |
| `ApexCLFarm` | CL position mint/stake/increase/decrease/collect calldata |
| `ApexVaultPosition` | Vault and veNFT calldata helpers |
| `validateApexVaultUserConfig` | Validate vault config weights before sending txs |
| `apexVaultCompoundBucket` | Compute vault compound bucket address |

## Re-exported Pancake v3 SDK

The package re-exports the pinned Pancake v3 SDK fork used by Apex. Common exports include:

- `Pool`
- `Route`
- `Trade`
- `SwapRouter` class from the pinned Pancake v3 SDK, for advanced CL-only calldata building
- `NonfungiblePositionManager`
- `SwapQuoter`
- `TickMath`
- `nearestUsableTick`
- `encodeSqrtRatioX96`

Use these for CL math and LP position building so frontend math matches Apex CL contracts.
