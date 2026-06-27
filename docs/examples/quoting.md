# Quoting Examples

## Classic pair address

```ts
import { computeClassicPoolAddress } from '@apex_labs/sdk'
import { apex } from './config'

const pair = computeClassicPoolAddress({
  config: apex,
  tokenA: tokenA.address,
  tokenB: tokenB.address,
  stable: false,
})
```

## Classic exact-input quote

Use this after reading pair reserves, decimals, and fee.

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

## CL pool address

```ts
import { CLFeeAmount, computeCLPoolAddress } from '@apex_labs/sdk'
import { apex } from './config'

const poolAddress = computeCLPoolAddress({
  config: apex,
  tokenA,
  tokenB,
  fee: CLFeeAmount.FEE_0_30,
})
```

## Mixed route quote

Mixed routes support Classic and CL hops in one path.

```ts
import {
  CLFeeAmount,
  encodeMixedRouteToQuoteParams,
  mixedQuoterAbi,
} from '@apex_labs/sdk'

const hops = [
  {
    kind: 'CL',
    tokenIn: tokenA.address,
    tokenOut: tokenB.address,
    fee: CLFeeAmount.FEE_0_30,
  },
  {
    kind: 'CLASSIC_STABLE',
    tokenIn: tokenB.address,
    tokenOut: tokenC.address,
  },
] as const

const { path, flags } = encodeMixedRouteToQuoteParams(hops)

const quote = await publicClient.readContract({
  address: apex.mixedQuoter,
  abi: mixedQuoterAbi,
  functionName: 'quoteExactInput',
  args: [path, flags, amountIn],
})
```

## Quote Sources

| Route | Quote with |
| --- | --- |
| Classic only | local reserves + `quoteClassicExactInput` |
| CL only | `QuoterV2`, SDK CL route math, or indexed data |
| Classic + CL | `MixedQuoter` |
