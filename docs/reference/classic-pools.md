# Classic Pools API

Classic pools are pair-style AMMs. Each pair is either volatile or stable, and the stable flag is part of the address calculation.

## `computeClassicPoolAddress(params)`

```ts
function computeClassicPoolAddress(params: {
  config: Pick<ApexDeploymentConfig, 'classicFactory' | 'classicPairInitCodeHash'>
  tokenA: Address
  tokenB: Address
  stable: boolean
}): Address
```

Computes the deterministic Classic pair address.

```ts
const pair = computeClassicPoolAddress({
  config: apex,
  tokenA: tokenA.address,
  tokenB: tokenB.address,
  stable: false,
})
```

Pass `stable: true` for stable pairs and `stable: false` for volatile pairs.

## `quoteClassicExactInput(params)`

```ts
function quoteClassicExactInput(params: {
  amountIn: BigintIsh
  tokenIn: Address
  token0: Address
  token1: Address
  reserve0: BigintIsh
  reserve1: BigintIsh
  token0Decimals: number
  token1Decimals: number
  stable: boolean
  fee: BigintIsh
}): bigint
```

Quotes Classic exact-input swaps from local pair state.

```ts
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

Inputs must come from the current pair state:

| Input | Source |
| --- | --- |
| `token0`, `token1` | pair contract |
| `reserve0`, `reserve1` | pair reserves |
| decimals | token metadata or token list |
| `stable` | pair type |
| `fee` | pair or factory fee state |

## `getClassicPoolStatus(params)`

```ts
function getClassicPoolStatus(params: {
  client: {
    readContract(params: {
      address: Address
      abi: readonly unknown[]
      functionName: string
      args?: readonly unknown[]
    }): Promise<unknown>
  }
  config: Pick<ApexDeploymentConfig, 'classicFactory'>
  tokenA: Address
  tokenB: Address
  stable: boolean
}): Promise<
  | { status: 'NOT_CREATED' }
  | {
      status: 'NEEDS_LIQUIDITY'
      pool: Address
      token0: Address
      token1: Address
      reserve0: bigint
      reserve1: bigint
      fee: bigint
    }
  | {
      status: 'READY'
      pool: Address
      token0: Address
      token1: Address
      reserve0: bigint
      reserve1: bigint
      fee: bigint
    }
>
```

Use this before deciding whether the UI should show create, first-liquidity, or normal add-liquidity states.

```ts
const status = await getClassicPoolStatus({
  client: publicClient,
  config: apex,
  tokenA: apex.weth,
  tokenB: usdt0.address,
  stable: false,
})

if (status.status === 'NOT_CREATED') showCreateOrAddFirstLiquidity()
if (status.status === 'NEEDS_LIQUIDITY') showAddFirstLiquidity(status.pool)
if (status.status === 'READY') showAddLiquidity(status.pool)
```

## `ClassicRouter`

Use `ClassicRouter` for Classic add/remove liquidity UX. Do not raw-transfer tokens to Classic pairs from the frontend. `addLiquidity` and `addLiquidityETH` create the pair if it does not exist, pull both assets atomically, and mint LP in one transaction.

These helpers require a deployed `classicRouter` address in your chain config. `smartRouter`
is for swaps/routes and does not add or remove Classic liquidity.

```ts
const add = ClassicRouter.addLiquidityCallParameters({
  tokenA: apex.weth,
  tokenB: usdt0.address,
  stable: false,
  amountADesired,
  amountBDesired,
  amountAMin,
  amountBMin,
  to: account,
  deadline,
})

await walletClient.sendTransaction({
  to: apex.classicRouter,
  data: add.calldata,
  value: BigInt(add.value),
})
```

For native ETH deposits, use `addLiquidityETHCallParameters`. The router wraps only the used ETH amount and refunds excess ETH.

```ts
const addETH = ClassicRouter.addLiquidityETHCallParameters({
  token: usdt0.address,
  stable: false,
  amountTokenDesired,
  amountETHDesired,
  amountTokenMin,
  amountETHMin,
  to: account,
  deadline,
})
```

Remove paths are also router-only:

```ts
const remove = ClassicRouter.removeLiquidityCallParameters({
  tokenA: apex.weth,
  tokenB: usdt0.address,
  stable: false,
  liquidity,
  amountAMin,
  amountBMin,
  to: account,
  deadline,
})

const removeETH = ClassicRouter.removeLiquidityETHCallParameters({
  token: usdt0.address,
  stable: false,
  liquidity,
  amountTokenMin,
  amountETHMin,
  to: account,
  deadline,
})
```

| Helper | Purpose |
| --- | --- |
| `ClassicRouter.createPairCallParameters(params)` | Encode explicit pair creation |
| `ClassicRouter.addLiquidityCallParameters(params)` | Encode ERC20/ERC20 Classic LP minting |
| `ClassicRouter.addLiquidityETHCallParameters(params)` | Encode ERC20/native Classic LP minting through WETH |
| `ClassicRouter.removeLiquidityCallParameters(params)` | Encode ERC20/ERC20 Classic LP burn |
| `ClassicRouter.removeLiquidityETHCallParameters(params)` | Encode ERC20/native Classic LP burn with WETH unwrap |

## Constants

| Export | Purpose |
| --- | --- |
| `APEX_CLASSIC_PAIR_INIT_CODE_HASH` | Default Classic pair init code hash |
| `APEX_CLASSIC_FEE_DENOMINATOR` | Fee denominator, `1_000_000` |
