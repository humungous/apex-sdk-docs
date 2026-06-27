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

## Constants

| Export | Purpose |
| --- | --- |
| `APEX_CLASSIC_PAIR_INIT_CODE_HASH` | Default Classic pair init code hash |
| `APEX_CLASSIC_FEE_DENOMINATOR` | Fee denominator, `1_000_000` |
