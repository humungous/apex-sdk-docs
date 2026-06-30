# CL Pools API

CL pools are concentrated-liquidity pools. The SDK gives you fee-tier constants, deterministic pool addresses, and an in-memory pool model for local calculations.

## `CLFeeAmount`

```ts
enum CLFeeAmount {
  FEE_0_01 = 100,
  FEE_0_02 = 200,
  FEE_0_05 = 500,
  FEE_0_10 = 1000,
  FEE_0_20 = 2000,
  FEE_0_30 = 3000,
  FEE_1_00 = 10000,
  FEE_2_00 = 20000,
}
```

Fee tiers are expressed in hundredths of a bip. `FEE_0_30` means `0.30%`.

## `CL_TICK_SPACINGS`

```ts
const CL_TICK_SPACINGS: Record<CLFeeAmount, number>
```

Tick spacing by CL fee tier.

## `isCLFeeAmount(fee)`

```ts
function isCLFeeAmount(fee: number): fee is CLFeeAmount
```

Returns `true` when `fee` is one of the supported Apex CL fee tiers.

## `toCLFeeAmount(fee)`

```ts
function toCLFeeAmount(fee: number): CLFeeAmount
```

Validates and returns a CL fee tier. Throws when the fee is unsupported.

## `getCLTickSpacing(fee)`

```ts
function getCLTickSpacing(fee: CLFeeAmount | number): number
```

Returns the tick spacing for a supported fee tier.

```ts
const spacing = getCLTickSpacing(CLFeeAmount.FEE_0_30)
```

## `computeCLPoolAddress(params)`

```ts
function computeCLPoolAddress(params: {
  config: Pick<ApexDeploymentConfig, 'clPoolDeployer' | 'clInitCodeHash'>
  tokenA: Token
  tokenB: Token
  fee: CLFeeAmount | number
}): Address
```

Computes the deterministic CL pool address for a token pair and fee tier.

```ts
const pool = computeCLPoolAddress({
  config: apex,
  tokenA,
  tokenB,
  fee: CLFeeAmount.FEE_0_30,
})
```

Use `clPoolDeployer`, not only `clFactory`, for address calculation.

## `getCLPoolStatus(params)`

```ts
type CLPoolStatus =
  | 'UNSUPPORTED_FEE'
  | 'NOT_CREATED'
  | 'NOT_INITIALIZED'
  | 'READY'

function getCLPoolStatus(params: {
  client: {
    readContract(params: {
      address: Address
      abi: readonly unknown[]
      functionName: string
      args?: readonly unknown[]
    }): Promise<unknown>
  }
  config: Pick<ApexDeploymentConfig, 'clFactory'>
  tokenA: Token | Address
  tokenB: Token | Address
  fee: CLFeeAmount | number
}): Promise<
  | { status: 'UNSUPPORTED_FEE' }
  | { status: 'NOT_CREATED' }
  | { status: 'NOT_INITIALIZED'; pool: Address }
  | { status: 'READY'; pool: Address }
>
```

Reads the CL factory and pool state to decide what the UI should show next.

```ts
const result = await getCLPoolStatus({
  client: publicClient,
  config: apex,
  tokenA: apex.weth,
  tokenB: usdt0.address,
  fee: CLFeeAmount.FEE_0_30,
})

if (result.status === 'UNSUPPORTED_FEE') showUnsupportedFee()
if (result.status === 'NOT_CREATED') showCreatePool()
if (result.status === 'NOT_INITIALIZED') showInitializePool(result.pool)
if (result.status === 'READY') showAddLiquidity(result.pool)
```

For native pairs, pass the wrapped-native token address, such as WETH, not an ETH placeholder address. `getCLPoolStatus` uses `CLFactory.getPool(tokenA, tokenB, fee)` and then reads `slot0()` when a pool exists, so token addresses and fee values must match the on-chain pool exactly.

## `createCLPool(params)`

```ts
function createCLPool(params: {
  tokenA: Token
  tokenB: Token
  fee: CLFeeAmount | number
  sqrtRatioX96: bigint | string | number
  liquidity: bigint | string | number
  tickCurrent: number
  ticks?: TickDataProvider
}): Pool
```

Creates an in-memory CL `Pool` object from on-chain state.

```ts
const pool = createCLPool({
  tokenA,
  tokenB,
  fee: CLFeeAmount.FEE_0_30,
  sqrtRatioX96: slot0.sqrtPriceX96,
  liquidity,
  tickCurrent: slot0.tick,
  ticks,
})
```

Use `Pool` for local CL price, route, trade, and position calculations.

## CL Math Exports

Use these when the app needs local CL price, liquidity, route, or position calculations.

| Export | What it does |
| --- | --- |
| `Pool` | Models current CL pool state |
| `Position` | Models liquidity between `tickLower` and `tickUpper` |
| `Route` | Models one or more CL pool hops |
| `Trade` | Models exact-input or exact-output CL trades |
| `TickMath` | Converts ticks and sqrt prices |
| `nearestUsableTick` | Rounds ticks to valid spacing |
| `encodeSqrtRatioX96` | Converts amount ratios into CL sqrt-price format |
| `NonfungiblePositionManager` | Builds low-level CL LP calldata |
| `SwapRouter` | Builds low-level CL-only swap calldata |
| `SwapQuoter` | Builds low-level CL quote calldata |
