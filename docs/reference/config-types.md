# Config and Types

## `ApexDeploymentConfig`

Deployment addresses for one chain.

```ts
interface ApexDeploymentConfig {
  chainId: number
  clFactory: Address
  clPoolDeployer: Address
  clInitCodeHash?: Hash
  clSwapRouter?: Address
  clQuoter?: Address
  clNonfungiblePositionManager?: Address
  clMasterChef?: Address
  smartRouter?: Address
  mixedQuoter?: Address
  classicFactory?: Address
  classicChef?: Address
  classicPairInitCodeHash?: Hash
  classicRouter?: Address
  weth?: Address
}
```

Keep one config object per chain. Use it as the source for pool address helpers, contract reads, and transaction targets.

## `BigintIsh`

```ts
type BigintIsh = bigint | string | number
```

Input type accepted by calldata builders for amounts, ids, deadlines, and minimums.

Numbers must be safe integers. For token amounts, prefer `bigint`.

## `CallParameters`

```ts
interface CallParameters {
  calldata: Hex
  value: Hex
}
```

Return type for transaction builders. Send `calldata` as the transaction `data`, and send `value` as the transaction value.

```ts
const tx = SmartRouter.mixedExactInputCallParameters(params, options)

await walletClient.sendTransaction({
  account,
  to: apex.smartRouter,
  data: tx.calldata,
  value: BigInt(tx.value),
})
```

## Address Helpers

| Export | Purpose |
| --- | --- |
| `normalizeAddress(address)` | Validates and checksums an address |
| `sortAddresses(tokenA, tokenB)` | Sorts two addresses by canonical address order |
| `computeCreate2Address(from, salt, bytecodeHash)` | Computes a generic CREATE2 address |
