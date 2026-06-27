# CL Pools

CL pools use concentrated liquidity with Pancake v3-compatible pool math and NFT positions. Each pool is defined by token pair and fee tier.

## Contracts

| Contract | Role |
| --- | --- |
| `CLFactory` | Creates CL pools and manages fee tiers |
| `CLPoolDeployer` | Deploys CL pools at deterministic addresses |
| `CLPool` | Concentrated-liquidity pool contract |
| `NonfungiblePositionManager` | Mints, modifies, collects, and burns CL position NFTs |
| `TickLens` | Reads initialized tick ranges |
| `Quoter` / `QuoterV2` | CL quote reads |
| `SmartRouter` | Executes Classic, CL, and mixed swap routes |

## Pool Discovery

```ts
import { CLFeeAmount, computeCLPoolAddress } from '@apex_labs/sdk'
import { apex } from '../config/apex'

const pool = computeCLPoolAddress({
  config: apex,
  tokenA,
  tokenB,
  fee: CLFeeAmount.FEE_0_30,
})
```

CL pool addresses are derived from `clPoolDeployer`. A correct factory address is not enough for deterministic address calculation.

## Pool State

CL quote and position math relies on current pool state:

| Input | Source |
| --- | --- |
| `slot0` | `CLPool.slot0()` |
| `liquidity` | `CLPool.liquidity()` |
| active ticks | `TickLens`, indexer, or pool events |
| fee tier | route selection or pool metadata |
| token order | deterministic token sorting |

Use the SDK's Pancake v3 re-exports for pool, route, trade, and position math so application calculations stay aligned with Apex CL contracts.

## Position Management

CL LP positions are ERC-721 tokens managed by `NonfungiblePositionManager`.

| Action | Contract |
| --- | --- |
| Mint position | `NonfungiblePositionManager` |
| Increase liquidity | `NonfungiblePositionManager` |
| Decrease liquidity | `NonfungiblePositionManager` |
| Collect fees | `NonfungiblePositionManager` |
| Stake position NFT | `CLMasterChef` through SDK farm helpers |

## Swap Execution

User swaps should execute through `SmartRouter` with SDK calldata helpers. `SwapRouter` remains available as low-level CL-only periphery for specialized flows that deliberately bypass mixed routing.

```ts
import { SmartRouter } from '@apex_labs/sdk'

const { calldata, value } = SmartRouter.exactInputCallParameters(
  {
    path,
    recipient: account,
    amountIn,
    amountOutMinimum,
  },
  {
    deadlineOrPreviousBlockhash: deadline,
  },
)
```
