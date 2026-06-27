# DEX Contract Structure

This is the short version your frontend team needs.

## Control plane

| Contract | What it does |
| --- | --- |
| `ApexController` | Admin/controller for farms, emissions, fee routing, and protocol-level settings |
| `EmissionCenter` | Vesting-wallet wrapper that can release reward tokens to the controller when emissions need funding |
| `ApexToken` | Apex reward/governance token |
| `VeApexToken` | Vote-escrow lock NFT used by the vault/reward system |
| `ApexVault` | veNFT vault that manages reward configs, claiming, compounding, and lock extension |

Frontend takeaway: most users do not call `ApexController` directly. It is mainly useful for admin pages, farm indexes, and reading global emission state.

## Classic AMM

| Contract | What it does |
| --- | --- |
| `ClassicFactory` | Creates and tracks Classic pairs |
| `ClassicPool` | Pair contract for volatile and stable swaps |
| `ClassicChef` | LP staking and reward distribution for Classic pairs |

Frontend takeaway: use Classic helpers for pair address calculation and local quote math. Use `ClassicChef` ABI for staking UI.

## Concentrated liquidity

| Contract | What it does |
| --- | --- |
| `CLFactory` | Creates CL pools and manages fee tiers |
| `CLPoolDeployer` | Deploys CL pools at deterministic addresses |
| `CLPool` | Pancake v3-style concentrated-liquidity pool |
| `LmPool` | Reward accounting sidecar for CL pool liquidity mining |
| `LmPoolDeployer` | Deploys `LmPool` contracts |
| `CLMasterChef` | Staked CL NFT rewards |

Frontend takeaway: CL liquidity is NFT-based. Use the SDK's re-exported Pancake v3 classes for pool, route, position, and swap math.

## Periphery

| Contract | What it does |
| --- | --- |
| `NonfungiblePositionManager` | Mint, modify, collect, and burn CL LP NFTs |
| `SwapRouter` | Low-level CL-only swap router |
| `SmartRouter` | Classic, CL, and mixed execution wrapper |
| `Quoter` / `QuoterV2` | CL quote reads |
| `MixedQuoter` | Exact-input quotes across Classic and CL hops |
| `TickLens` | CL tick data reads |
| `InterfaceMulticall` | Batched reads |

Frontend takeaway: user-facing swap UI should default to `SmartRouter` and the SDK's `ApexSmartRouter` calldata helpers. Treat `SwapRouter` as a low-level CL-only periphery contract for specialized flows.

## Fees

| Contract | What it does |
| --- | --- |
| `FeeCenter` | Collects and splits protocol fees |
| `FeeReceiver` | Per-receiver fee accounting and forwarding |

Frontend takeaway: useful for fee dashboards and admin ops, not normal trading UI.

## How a trade moves

1. UI builds a route from user input and available pools.
2. UI quotes via local SDK math, `MixedQuoter`, `QuoterV2`, or indexed route data.
3. UI builds execution calldata with `ApexSmartRouter`.
4. Wallet sends the transaction to `SmartRouter`.
5. Pools update balances/liquidity; fees and rewards are accounted by the relevant pool/farm contracts.
