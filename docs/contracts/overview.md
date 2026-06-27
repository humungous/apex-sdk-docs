# DEX Contract Structure

Apex combines Classic AMM pools, concentrated-liquidity pools, unified swap routing, farm contracts, and ApexVault reward management.

## Control plane

| Contract | What it does |
| --- | --- |
| `ApexController` | Admin/controller for farms, emissions, fee routing, and protocol-level settings |
| `EmissionCenter` | Vesting-wallet wrapper that can release reward tokens to the controller when emissions need funding |
| `ApexToken` | Apex reward/governance token |
| `VeApexToken` | Vote-escrow lock NFT used by ApexVault |
| `ApexVault` | Manages veNFT reward configs, claiming, compounding, and lock extension |

`ApexController` is not part of normal trade execution. It is relevant for admin surfaces, farm indexes, and global emission state.

## Classic AMM

| Contract | What it does |
| --- | --- |
| `ClassicFactory` | Creates and tracks Classic pairs |
| `ClassicPool` | Pair contract for volatile and stable swaps |
| `ClassicChef` | LP staking and reward distribution for Classic pairs |

See [Classic Pools](./classic-pools.md) for pair discovery, local quote inputs, and Classic LP integration.

## Concentrated liquidity

| Contract | What it does |
| --- | --- |
| `CLFactory` | Creates CL pools and manages fee tiers |
| `CLPoolDeployer` | Deploys CL pools at deterministic addresses |
| `CLPool` | Pancake v3-style concentrated-liquidity pool |
| `LmPool` | Reward accounting sidecar for CL pool liquidity mining |
| `LmPoolDeployer` | Deploys `LmPool` contracts |
| `CLMasterChef` | Staked CL NFT rewards |

See [CL Pools](./cl-pools.md) for deterministic pool addresses, CL position data, and Pancake v3-compatible SDK usage.

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

User swap flows should execute through `SmartRouter` using SDK calldata helpers. `SwapRouter` is low-level CL-only periphery for specialized integrations.

## Fees

| Contract | What it does |
| --- | --- |
| `FeeCenter` | Collects and splits protocol fees |
| `FeeReceiver` | Per-receiver fee accounting and forwarding |

Fee contracts are relevant for fee dashboards, accounting, and admin operations. They are not required for swap or LP user flows.

## Product Areas

| Area | Primary contracts | SDK surface |
| --- | --- | --- |
| [Classic Pools](./classic-pools.md) | `ClassicFactory`, `ClassicPool` | `computeClassicPoolAddress`, `quoteClassicExactInput`, Classic ABIs |
| [CL Pools](./cl-pools.md) | `CLFactory`, `CLPool`, `NonfungiblePositionManager` | `computeCLPoolAddress`, Pancake v3 SDK re-exports, CL ABIs |
| [Farming](./farming.md) | `ClassicChef`, `CLMasterChef`, `LmPool` | `ClassicChef`, `CLMasterChef` |
| [ApexVault](./apex-vault.md) | `ApexVault`, `VeApexToken` | `ApexVault`, `validateApexVaultUserConfig` |

## How a trade moves

1. UI builds a route from user input and available pools.
2. UI quotes via local SDK math, `MixedQuoter`, `QuoterV2`, or indexed route data.
3. UI builds execution calldata with `SmartRouter`.
4. Wallet sends the transaction to `SmartRouter`.
5. Pools update balances/liquidity; fees and rewards are accounted by the relevant pool/farm contracts.
