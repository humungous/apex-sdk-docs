# Classic Pools

Classic pools are pair-style AMMs with deterministic pair addresses. Each pair is either volatile or stable, and the stable flag is part of the pool identity.

## Contracts

| Contract | Role |
| --- | --- |
| `ClassicFactory` | Creates Classic pairs and exposes pair lookup state |
| `ClassicPool` | ERC-20 LP token and swap pool for volatile or stable curves |
| `ClassicChef` | LP staking and reward distribution for Classic pair tokens |
| `SmartRouter` | Executes Classic, CL, and mixed swap routes |

## Pool Discovery

Use the SDK address helper when the token pair and stable flag are known:

```ts
import { computeClassicPoolAddress } from '@apex_labs/sdk'
import { apex } from '../config/apex'

const pair = computeClassicPoolAddress({
  config: apex,
  tokenA: tokenA.address,
  tokenB: tokenB.address,
  stable: false,
})
```

`classicPairInitCodeHash` must match the deployed Classic pool bytecode. Keep it in the chain config beside the factory address.

## Quotes

Classic local quotes require:

| Input | Source |
| --- | --- |
| `reserve0`, `reserve1` | `ClassicPool.getReserves()` or indexed pair state |
| `token0`, `token1` | `ClassicPool.token0()` and `ClassicPool.token1()` |
| token decimals | ERC-20 metadata or token list |
| `stable` | pair metadata or route selection |
| `fee` | pair or factory fee state, depending on the deployment |

```ts
import { quoteClassicExactInput } from '@apex_labs/sdk'

const amountOut = quoteClassicExactInput({
  amountIn,
  tokenIn: tokenA.address,
  token0,
  token1,
  reserve0,
  reserve1,
  token0Decimals: 18,
  token1Decimals: 18,
  stable: false,
  fee,
})
```

## Swap Execution

Classic swaps should be sent through `SmartRouter` with SDK calldata helpers. The helper encodes the route and wraps the call in router multicall semantics with a deadline or previous blockhash.

```ts
import { SmartRouter } from '@apex_labs/sdk'

const { calldata, value } = SmartRouter.classicExactInputCallParameters(
  {
    amountIn,
    amountOutMin,
    path: [tokenA.address, tokenB.address],
    recipient: account,
  },
  {
    deadlineOrPreviousBlockhash: deadline,
  },
)
```

## LP and Farm State

Classic LP positions use the pair ERC-20 balance. Farm positions are tracked by `ClassicChef` pid.

| UI field | Source |
| --- | --- |
| Pair address | `computeClassicPoolAddress` or `ClassicFactory` lookup |
| LP wallet balance | `ClassicPool.balanceOf(account)` |
| LP total supply | `ClassicPool.totalSupply()` |
| Farm pid | deployment metadata or indexed `ClassicChef` pool list |
| Staked balance | `ClassicChef` user position state |
| Pending rewards | `ClassicChef` pending reward reads |
