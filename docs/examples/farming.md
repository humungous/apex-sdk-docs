# Farming Examples

## Classic Farm

Classic farms stake pair ERC-20 LP tokens into `ClassicChef`. Read or index the pid for each pair, then build calldata with `ClassicChef`.

```ts
import { ClassicChef } from '@apex_labs/sdk'

const stake = ClassicChef.depositCallParameters({
  pid,
  amount,
})

const claim = ClassicChef.harvestCallParameters({
  pid,
})

const exit = ClassicChef.withdrawCallParameters({
  pid,
  amount,
})
```

## CL Farm

CL farms stake position NFTs. `CLMasterChef` builds calldata for minting, staking, increasing, decreasing, collecting, and unstaking CL positions.

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

## Required State

| Product area | State |
| --- | --- |
| Classic farm | pair address, pid, LP balance, staked balance, pending rewards |
| CL farm | NFT token id, staked owner, liquidity, tick range, fee tier, pending rewards |
