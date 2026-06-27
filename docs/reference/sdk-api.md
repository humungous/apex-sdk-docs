# SDK API Reference

Core exports for Apex application integrations. Use TypeScript autocomplete for exact parameter types.

## Config and constants

| Export | Purpose |
| --- | --- |
| `ApexDeploymentConfig` | App-level deployment config per chain |
| `CLFeeAmount` | Apex CL fee tiers |
| `APEX_CL_TICK_SPACINGS` | Tick spacing per CL fee tier |
| `APEX_CL_POOL_INIT_CODE_HASH` | Default CL init code hash |
| `APEX_CLASSIC_PAIR_INIT_CODE_HASH` | Default Classic pair init code hash |
| `APEX_CLASSIC_FEE_DENOMINATOR` | Classic fee denominator, `1_000_000` |
| `APEX_CL_PROTOCOL_FEE_DENOMINATOR` | CL protocol fee denominator, `10_000` |

## Pool helpers

| Export | Purpose |
| --- | --- |
| `computeCLPoolAddress` | Compute deterministic CL pool address |
| `createCLPool` | Create a Pancake-compatible `Pool` with Apex fee tiers |
| `getCLTickSpacing` | Resolve tick spacing for an Apex fee tier |
| `computeClassicPoolAddress` | Compute deterministic Classic pair address |
| `quoteClassicExactInput` | Local Classic exact-input quote from reserves |

## Mixed routing

| Export | Purpose |
| --- | --- |
| `MixedRouteHop` | Route hop type for Classic/CL mixed paths |
| `encodeMixedRouteToPath` | Encode mixed route path bytes |
| `decodeMixedRoutePath` | Decode mixed route path bytes |
| `encodeMixedRouteToPancakeQuoteParams` | Encode path and flags for Pancake-style mixed quote provider |

## Swap calldata

| Export | Purpose |
| --- | --- |
| `SmartRouter` | Builds SmartRouter calldata for Classic, CL, stable, and mixed swaps |
| `SmartRouter.swapCallParameters` | Wrap custom router calls in one router multicall |
| `SmartRouter.mixedExactInputCallParameters` | Main helper for mixed exact-input user swaps |
| `SmartRouter.exactInputCallParameters` | CL exact-input segment |
| `SmartRouter.classicExactInputCallParameters` | Classic volatile segment |
| `SmartRouter.stableExactInputCallParameters` | Classic stable segment |

## Farming

| Export | Purpose |
| --- | --- |
| `ClassicChef` | Classic Chef deposit/withdraw/harvest calldata |
| `CLMasterChef` | CL position mint/stake/increase/decrease/collect calldata |

## ApexVault

| Export | Purpose |
| --- | --- |
| `ApexVault` | ApexVault and veNFT calldata helpers |
| `validateApexVaultUserConfig` | Validate ApexVault config weights before sending transactions |
| `getApexVaultCompoundBucket` | Compute ApexVault compound bucket address |

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

Use these for CL math and LP position building so application calculations match Apex CL contracts.
