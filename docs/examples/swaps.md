# Swap Examples

## Mixed exact-input swap

Use `SmartRouter` call-parameter helpers for user swap execution. They wrap the swap in a `SmartRouter.multicall` with a deadline or previous blockhash.

```ts
import { CLFeeAmount, SmartRouter } from '@apex_labs/sdk'

const hops = [
  {
    kind: 'CL',
    tokenIn: tokenA.address,
    tokenOut: tokenB.address,
    fee: CLFeeAmount.FEE_0_30,
  },
  {
    kind: 'CLASSIC_VOLATILE',
    tokenIn: tokenB.address,
    tokenOut: tokenC.address,
  },
] as const

const { calldata, value } = SmartRouter.mixedExactInputCallParameters(
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

Pass the returned `calldata` and `value` to the app transaction layer.

If `value` is nonzero, the SDK appends `refundETH()` to the multicall automatically so unused native ETH returns to `msg.sender`.

## Classic route segment

```ts
const { calldata } = SmartRouter.classicExactInputCallParameters(
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
const { calldata } = SmartRouter.exactInputCallParameters(
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

Router helpers support cleanup payments such as:

- refund native ETH
- unwrap WETH
- sweep leftover tokens

Native ETH refund is automatic for payable `SmartRouter` calls built by the SDK. Token sweeps and WETH unwraps require explicit payment entries because the SDK cannot infer the intended token, recipient, or minimum amount for every route.
