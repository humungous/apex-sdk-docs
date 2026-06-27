# Swap Examples

## Mixed exact-input swap

For user-facing swaps, use the `ApexSmartRouter` call-parameter helpers. They wrap the swap in a `SmartRouter.multicall` with a deadline or previous blockhash.

```ts
import { ApexFeeAmount, ApexSmartRouter } from '@apex_labs/sdk'

const hops = [
  {
    kind: 'CL',
    tokenIn: tokenA.address,
    tokenOut: tokenB.address,
    fee: ApexFeeAmount.FEE_0_30,
  },
  {
    kind: 'CLASSIC_VOLATILE',
    tokenIn: tokenB.address,
    tokenOut: tokenC.address,
  },
] as const

const { calldata, value } = ApexSmartRouter.mixedExactInputCallParameters(
  {
    hops,
    recipient: account,
    amountIn,
    amountOutMinimum,
  },
  {
    deadlineOrPreviousBlockhash: deadline,
  },
)

await walletClient.sendTransaction({
  account,
  to: apex.smartRouter,
  data: calldata,
  value: BigInt(value),
})
```

Most apps can pass the `calldata` and `value` returned by the helper to their existing transaction layer.

## Classic route segment

```ts
const { calldata } = ApexSmartRouter.classicExactInputCallParameters(
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

## CL route segment through SmartRouter

```ts
const { calldata } = ApexSmartRouter.exactInputCallParameters(
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

## Cleanup calls

The router helpers support cleanup payments such as:

- refund native ETH
- unwrap WETH
- sweep leftover tokens

Use cleanup calls when the route may leave dust in the router. Avoid custom multicalls unless the flow has a test covering refund behavior.
