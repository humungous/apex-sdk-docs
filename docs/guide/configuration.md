# Configuration

Keep one Apex deployment config per chain.

```ts
import type { ApexDeploymentConfig } from '@apex_labs/sdk'

export const apex: ApexDeploymentConfig = {
  chainId: 31337,
  clFactory: '0x...',
  clPoolDeployer: '0x...',
  clSwapRouter: '0x...',
  clQuoter: '0x...',
  clNonfungiblePositionManager: '0x...',
  clMasterChef: '0x...',
  smartRouter: '0x...',
  mixedQuoter: '0x...',
  classicFactory: '0x...',
  classicPairInitCodeHash: '0x...',
  classicRouter: '0x...',
  classicChef: '0x...',
  weth: '0x...',
}
```

## What each field is for

| Field | Used for |
| --- | --- |
| `chainId` | Token objects, route construction, and client checks |
| `clFactory` | Finding and validating CL pools |
| `clPoolDeployer` | Deterministic CL pool address calculation |
| `clSwapRouter` | Low-level CL-only router address for specialized CL flows |
| `clQuoter` | CL quote reads |
| `clNonfungiblePositionManager` | CL LP NFT mint/increase/decrease/collect actions |
| `clMasterChef` | Staked CL position rewards |
| `smartRouter` | Classic, CL, and mixed route execution |
| `mixedQuoter` | Mixed Classic + CL exact-input quotes |
| `classicFactory` | Classic pair lookup and address calculation |
| `classicPairInitCodeHash` | Deterministic Classic pair address calculation |
| `classicRouter` | Classic-only router compatibility |
| `classicChef` | Classic LP staking rewards |
| `weth` | ETH wrapping/unwrapping cleanup |

## Deployment Discipline

- Do not hardcode config inside components.
- Keep config in one module like `src/config/apex.ts`.
- Treat address changes as deployments, not UI changes.
- Validate chain ID before sending transactions.
