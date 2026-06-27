# Farming

Apex has separate farming paths for Classic LP tokens and CL position NFTs.

## Classic Farm

Classic farm positions stake pair ERC-20 LP tokens into `ClassicChef`.

| Concept | Detail |
| --- | --- |
| Position asset | Classic pair ERC-20 LP token |
| Farm identifier | `pid` |
| Primary contract | `ClassicChef` |
| SDK helper | `ClassicChef` |

```ts
import { ClassicChef } from '@apex_labs/sdk'

const stake = ClassicChef.depositCallParameters({
  pid,
  amount,
})

const claim = ClassicChef.harvestCallParameters({
  pid,
})
```

Track the pair address, pid, wallet LP balance, staked LP balance, and pending reward amount.

## CL Farm

CL farm positions stake NFT liquidity positions. The NFT represents the tick range, liquidity, and fee growth state.

| Concept | Detail |
| --- | --- |
| Position asset | CL position NFT |
| Farm identifier | position token id |
| Primary contract | `CLMasterChef` |
| Reward sidecar | `LmPool` |
| SDK helper | `CLMasterChef` |

```ts
import { CLMasterChef, CLFeeAmount } from '@apex_labs/sdk'

const { calldata, value } = CLMasterChef.mintAndStakeCallParameters(
  {
    token0: tokenA.address,
    token1: tokenB.address,
    fee: CLFeeAmount.FEE_0_30,
    tickLower,
    tickUpper,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
    account,
    deadline,
  },
  {
    stakingReceiver: apex.clMasterChef,
    nonfungiblePositionManager: apex.clNonfungiblePositionManager,
    value,
  },
)
```

Track the NFT owner, staked owner, liquidity, tick range, fee tier, pending rewards, and collectable fee state.
