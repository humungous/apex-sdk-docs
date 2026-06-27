# Routes and Quotes API

The SDK can encode paths that combine CL hops with Classic stable or volatile hops.

## `MixedRouteHop`

```ts
type MixedRouteHop =
  | { kind: 'CL'; tokenIn: Address; tokenOut: Address; fee: number }
  | { kind: 'CLASSIC_STABLE'; tokenIn: Address; tokenOut: Address }
  | { kind: 'CLASSIC_VOLATILE'; tokenIn: Address; tokenOut: Address }
```

Each hop must connect to the next hop: the previous `tokenOut` must equal the next `tokenIn`.

## `encodeMixedRouteToPath(hops, exactOutput?)`

```ts
function encodeMixedRouteToPath(
  hops: readonly MixedRouteHop[],
  exactOutput?: boolean
): Hex
```

Encodes a mixed route path for `SmartRouter`.

```ts
const path = encodeMixedRouteToPath([
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
])
```

Set `exactOutput: true` only when encoding a reversed exact-output CL path.

## `decodeMixedRoutePath(path)`

```ts
function decodeMixedRoutePath(path: Hex): MixedRouteHop[]
```

Decodes a mixed path back into route hops.

## `encodeMixedRouteToQuoteParams(hops, exactOutput?)`

```ts
function encodeMixedRouteToQuoteParams(
  hops: readonly MixedRouteHop[],
  exactOutput?: boolean
): { path: Hex; flags: number[] }
```

Encodes path bytes and Classic-hop flags for `MixedQuoter.quoteExactInput`.

```ts
const { path, flags } = encodeMixedRouteToQuoteParams(hops)

const quote = await publicClient.readContract({
  address: apex.mixedQuoter,
  abi: mixedQuoterAbi,
  functionName: 'quoteExactInput',
  args: [path, flags, amountIn],
})
```

## Route Constants

| Export | Purpose |
| --- | --- |
| `APEX_MIXED_ROUTE_CLASSIC_STABLE` | Internal action code for Classic stable hops |
| `APEX_MIXED_ROUTE_CLASSIC_VOLATILE` | Internal action code for Classic volatile hops |
| `APEX_MIXED_ROUTE_STABLE_FLAG` | Quote flag for Classic stable hops |
| `APEX_MIXED_ROUTE_VOLATILE_FLAG` | Quote flag for Classic volatile hops |

## Protocol Fee Helpers

### `packProtocolFees(token0ProtocolFee, token1ProtocolFee)`

```ts
function packProtocolFees(
  token0ProtocolFee: bigint | number,
  token1ProtocolFee: bigint | number
): bigint
```

Packs token0 and token1 protocol fees into the format used by CL fee state.

### `parseProtocolFeePacked(feeProtocol)`

```ts
function parseProtocolFeePacked(
  feeProtocol: bigint | number | string
): { token0ProtocolFee: bigint; token1ProtocolFee: bigint }
```

Unpacks token0 and token1 protocol fees.
