# Configuration

Keep one Apex deployment config per chain.

```ts
import type { ApexDeploymentConfig } from '@apex_labs/sdk'

export const apex: ApexDeploymentConfig = {
  chainId: 31337,
  apexToken: '0x...',
  apexController: '0x...',
  emissionCenter: '0x...',
  clFactory: '0x...',
  clPoolDeployer: '0x...',
  clSwapRouter: '0x...',
  clQuoter: '0x...',
  quoterV2: '0x...',
  clNonfungiblePositionManager: '0x...',
  clMasterChef: '0x...',
  lmPoolDeployer: '0x...',
  positionDescriptor: '0x...',
  smartRouter: '0x...',
  mixedQuoter: '0x...',
  tickLens: '0x...',
  interfaceMulticall: '0x...',
  classicFactory: '0x...',
  classicPairInitCodeHash: '0x...',
  classicChef: '0x...',
  veApexToken: '0x...',
  apexVault: '0x...',
  feeCenter: '0x...',
  feeReceiverImplementation: '0x...',
  weth: '0x...',
}
```

Published deployment configs are listed in [Deployed Contracts](../contracts/index.md).

## What each field is for

| Field | Used for |
| --- | --- |
| `chainId` | Token objects, route construction, and client checks |
| `apexToken` | Reward/governance token reads and approvals |
| `apexController` | Farm, emission, fee, and protocol-level state reads |
| `emissionCenter` | Test/protocol emission reserve state |
| `clFactory` | Finding and validating CL pools |
| `clPoolDeployer` | Deterministic CL pool address calculation |
| `clSwapRouter` | Low-level CL-only router address for specialized CL flows |
| `clQuoter` | CL quote reads |
| `quoterV2` | CL quote reads with extended quote data |
| `clNonfungiblePositionManager` | CL LP NFT mint/increase/decrease/collect actions |
| `clMasterChef` | Staked CL position rewards |
| `lmPoolDeployer` | CL liquidity-mining pool discovery |
| `positionDescriptor` | CL NFT metadata descriptor |
| `smartRouter` | Classic, CL, and mixed route execution |
| `mixedQuoter` | Mixed Classic + CL exact-input quotes |
| `tickLens` | CL initialized tick reads |
| `interfaceMulticall` | Batched read calls |
| `classicFactory` | Classic pair lookup and address calculation |
| `classicPairInitCodeHash` | Deterministic Classic pair address calculation |
| `classicChef` | Classic LP staking rewards |
| `veApexToken` | Vote-escrow NFT lock actions |
| `apexVault` | Staked veNFT reward config, claim, compound, and lock actions |
| `feeCenter` | Protocol fee accounting and receiver discovery |
| `feeReceiverImplementation` | FeeReceiver ABI target for receiver proxies |
| `weth` | ETH wrapping/unwrapping cleanup |

## Deployment Discipline

- Do not hardcode config inside components.
- Keep config in one module like `src/config/apex.ts`.
- Treat address changes as deployments, not UI changes.
- Validate chain ID before sending transactions.
