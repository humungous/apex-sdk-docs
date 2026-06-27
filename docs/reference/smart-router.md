# SmartRouter API

`SmartRouter` builds swap calldata for the Apex `SmartRouter` contract. The call-parameter helpers always wrap the swap call in `SmartRouter.multicall(...)` with a deadline or previous blockhash.

## Return Type

```ts
type CallParameters = {
  calldata: Hex
  value: Hex
}
```

Send `calldata` as transaction data and `value` as transaction value.

## Options

```ts
type SmartRouterOptions = {
  deadlineOrPreviousBlockhash: BigintIsh | Hex
  value?: BigintIsh
  payments?: readonly SmartRouterPayment[]
}
```

`deadlineOrPreviousBlockhash` selects the `multicall(uint256,bytes[])` or `multicall(bytes32,bytes[])` overload.

If `value` is nonzero, the SDK appends `refundETH()` automatically. Token sweeps and WETH unwraps require explicit payment entries.

## `mixedExactInputCallParameters(params, options)`

```ts
SmartRouter.mixedExactInputCallParameters(
  {
    hops: readonly MixedRouteHop[]
    recipient: Address
    amountIn: BigintIsh
    amountOutMinimum: BigintIsh
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for exact-input routes that can include CL, Classic volatile, and Classic stable hops.

## `classicExactInputCallParameters(params, options)`

```ts
SmartRouter.classicExactInputCallParameters(
  {
    amountIn: BigintIsh
    amountOutMin: BigintIsh
    path: readonly Address[]
    recipient: Address
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for Classic volatile exact-input routes.

## `stableExactInputCallParameters(params, options)`

```ts
SmartRouter.stableExactInputCallParameters(
  {
    amountIn: BigintIsh
    amountOutMin: BigintIsh
    path: readonly Address[]
    flags: readonly BigintIsh[]
    recipient: Address
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for Classic stable exact-input routes. `flags.length` must equal `path.length - 1`.

## `exactInputCallParameters(params, options)`

```ts
SmartRouter.exactInputCallParameters(
  {
    path: Hex
    recipient: Address
    amountIn: BigintIsh
    amountOutMinimum: BigintIsh
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for CL or pre-encoded mixed exact-input paths.

## `exactInputSingleCallParameters(params, options)`

```ts
SmartRouter.exactInputSingleCallParameters(
  {
    tokenIn: Address
    tokenOut: Address
    fee: number
    recipient: Address
    amountIn: BigintIsh
    amountOutMinimum: BigintIsh
    sqrtPriceLimitX96?: BigintIsh
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for one CL pool exact-input swap.

## `exactOutputSingleCallParameters(params, options)`

```ts
SmartRouter.exactOutputSingleCallParameters(
  {
    tokenIn: Address
    tokenOut: Address
    fee: number
    recipient: Address
    amountOut: BigintIsh
    amountInMaximum: BigintIsh
    sqrtPriceLimitX96?: BigintIsh
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for one CL pool exact-output swap.

## `exactOutputCallParameters(params, options)`

```ts
SmartRouter.exactOutputCallParameters(
  {
    path: Hex
    recipient: Address
    amountOut: BigintIsh
    amountInMaximum: BigintIsh
  },
  options: SmartRouterOptions
): CallParameters
```

Builds calldata for CL exact-output paths. Mixed exact-output routes are not supported.

## Cleanup Payments

```ts
type SmartRouterPayment =
  | { kind: 'REFUND_ETH' }
  | { kind: 'UNWRAP_WETH9'; amountMinimum: BigintIsh; recipient: Address }
  | { kind: 'SWEEP_TOKEN'; token: Address; amountMinimum: BigintIsh; recipient: Address }
```

Use explicit cleanup entries when the route can leave WETH or ERC-20 dust in the router.

```ts
const tx = SmartRouter.exactInputSingleCallParameters(params, {
  deadlineOrPreviousBlockhash: deadline,
  value,
  payments: [
    {
      kind: 'UNWRAP_WETH9',
      amountMinimum: 0n,
      recipient: account,
    },
  ],
})
```

## Encoding Methods

`SmartRouter` also exposes raw encoders:

- `encodeExactInputSingle`
- `encodeExactInput`
- `encodeExactOutputSingle`
- `encodeExactOutput`
- `encodeClassicExactInput`
- `encodeStableExactInput`
- `encodeMulticall`
- `encodeRefundETH`
- `encodeUnwrapWETH9`
- `encodeSweepToken`

Use raw encoders only when building a custom multicall and testing the full calldata sequence.
