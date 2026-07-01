# SDK API Reference

The Apex SDK exports typed helpers for addresses, quoting, calldata generation, farm actions, ApexVault actions, and ABI reads/writes.

## Install

```bash
npm install @apex_labs/sdk@latest
```

## Reference

| Area | What it covers |
| --- | --- |
| [Config and Types](./config-types.md) | Deployment config, shared bigint/call types |
| [CL Pools](./cl-pools.md) | CL fee tiers, tick spacing, pool address calculation, CL pool objects |
| [Classic Pools](./classic-pools.md) | Classic pair status, address calculation, quote math, and liquidity calldata |
| [Routes and Quotes](./routes-quotes.md) | Mixed Classic/CL paths, quote path encoding, protocol fee packing |
| [SmartRouter](./smart-router.md) | Swap calldata builders, multicall wrapping, refund and cleanup behavior |
| [Farming](./farming.md) | ClassicChef and CLMasterChef calldata helpers |
| [ApexVault](./apex-vault.md) | veNFT config validation, staked veNFT discovery, and ApexVault calldata helpers |
| [ABI Exports](./abis.md) | Contract ABI exports for reads and custom writes |

## Low-level CL Math Exports

The SDK also exports CL math and position-building classes. These are Apex SDK primitives; no external protocol knowledge is required to use them.

| Export | Purpose |
| --- | --- |
| `Pool` | In-memory CL pool model built from `slot0`, liquidity, fee tier, tokens, and tick data |
| `Route` | In-memory path of one or more CL pools |
| `Trade` | In-memory trade model for exact-input or exact-output CL routes |
| `Position` | In-memory CL liquidity position model for a tick range |
| `NonfungiblePositionManager` | Low-level CL LP calldata builder for mint, increase, decrease, collect, and burn |
| `SwapRouter` | Low-level CL-only swap calldata builder |
| `SwapQuoter` | Low-level CL quote calldata builder |
| `TickMath` | Tick and sqrt-price conversions |
| `nearestUsableTick` | Rounds a tick to the nearest valid tick spacing |
| `encodeSqrtRatioX96` | Converts token amount ratios into CL sqrt price format |

These exports are for CL math and CL-only periphery flows. User swap execution should normally use [`SmartRouter`](./smart-router.md).
