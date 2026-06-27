# Farming API

The SDK has separate helpers for Classic LP farms and CL NFT farms.

## ClassicChef

Classic farms use pid-based LP staking.

### `depositCallParameters(params)`

```ts
ClassicChef.depositCallParameters({
  pid: BigintIsh
  amount: BigintIsh
}): CallParameters
```

Builds `ClassicChef.deposit(pid, amount)` calldata.

### `withdrawCallParameters(params)`

```ts
ClassicChef.withdrawCallParameters({
  pid: BigintIsh
  amount: BigintIsh
}): CallParameters
```

Builds `ClassicChef.withdraw(pid, amount)` calldata.

### `harvestCallParameters(params)`

```ts
ClassicChef.harvestCallParameters({
  pid: BigintIsh
}): CallParameters
```

Builds `ClassicChef.harvest(pid)` calldata.

### `emergencyWithdrawCallParameters(params)`

```ts
ClassicChef.emergencyWithdrawCallParameters({
  pid: BigintIsh
}): CallParameters
```

Builds `ClassicChef.emergencyWithdraw(pid)` calldata.

### `encodePendingReward(params)`

```ts
ClassicChef.encodePendingReward({
  pid: BigintIsh
  account: Address
}): Hex
```

Builds read calldata for pending rewards.

## CLMasterChef

CL farms use staked position NFTs.

### `mintAndStakeCallParameters(params, options)`

```ts
CLMasterChef.mintAndStakeCallParameters(
  {
    token0: Address
    token1: Address
    fee: number
    tickLower: number
    tickUpper: number
    amount0Desired: BigintIsh
    amount1Desired: BigintIsh
    amount0Min: BigintIsh
    amount1Min: BigintIsh
    account: Address
    deadline: BigintIsh
  },
  {
    stakingReceiver: Address
    nonfungiblePositionManager: Address
    value?: BigintIsh
  }
): CallParameters
```

Builds calldata to mint a CL NFT and stake it. If `value` is nonzero, the SDK wraps the mint call in `NonfungiblePositionManager.multicall(...)` and appends `refundETH()`.

`account` becomes the staked NFT owner. The helper rejects the Chef and NFP manager as owners.

### `increaseLiquidityCallParameters(params, value?)`

```ts
CLMasterChef.increaseLiquidityCallParameters(
  {
    tokenId: BigintIsh
    amount0Desired: BigintIsh
    amount1Desired: BigintIsh
    amount0Min: BigintIsh
    amount1Min: BigintIsh
    deadline: BigintIsh
  },
  value?: BigintIsh
): CallParameters
```

Builds a `CLMasterChef.multicall(...)` containing `increaseLiquidity`.

### `collectCallParameters(params)`

```ts
CLMasterChef.collectCallParameters({
  tokenId: BigintIsh
  recipient: Address
  amount0Max?: BigintIsh
  amount1Max?: BigintIsh
}): CallParameters
```

Builds a `CLMasterChef.multicall(...)` containing `collectTo`.

### `decreaseAndCollectCallParameters(decrease, collect)`

```ts
CLMasterChef.decreaseAndCollectCallParameters(
  {
    tokenId: BigintIsh
    liquidity: BigintIsh
    amount0Min: BigintIsh
    amount1Min: BigintIsh
    deadline: BigintIsh
  },
  {
    tokenId: BigintIsh
    recipient: Address
    amount0Max?: BigintIsh
    amount1Max?: BigintIsh
  }
): CallParameters
```

Builds a multicall that decreases liquidity and collects fees.

### `closeAndBurnCallParameters(decrease, collect)`

```ts
CLMasterChef.closeAndBurnCallParameters(decrease, collect): CallParameters
```

Builds `harvest -> decreaseLiquidity -> collectTo -> burn` in one `CLMasterChef.multicall(...)`.

### Other CL NFT Farm Helpers

| Method | Purpose |
| --- | --- |
| `harvestCallParameters({ tokenId, to })` | Harvest rewards to `to` |
| `withdrawCallParameters({ tokenId, to })` | Withdraw a staked NFT to `to` |
| `burnCallParameters({ tokenId })` | Burn an empty staked position |
| `encodeMulticall(calldatas)` | Encode `CLMasterChef.multicall` |
| `encodeNfpMulticall(calldatas)` | Encode `NonfungiblePositionManager.multicall` |
| `encodeNfpRefundETH()` | Encode NFP `refundETH()` |
