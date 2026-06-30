# ApexVault API

ApexVault helpers build calldata for veNFT staking, reward configuration, claiming, compounding allocation, and lock management.

## Config Types

```ts
type ApexVaultRewardConfig = {
  rewardToken: Address
  bps: number
}

type ApexVaultUserConfigParams = {
  rewardConfigs: readonly ApexVaultRewardConfig[]
  compoundBps?: number
}
```

`rewardConfigs[].bps + compoundBps` must equal `10_000`.

## `validateApexVaultUserConfig(config)`

```ts
function validateApexVaultUserConfig(config: ApexVaultUserConfigParams): void
```

Validates reward-token weights. Throws when:

- total bps is not `10_000`
- a reward token is duplicated
- a reward token is the zero address
- a reward-token bps value is zero
- more than 16 reward tokens are configured

## `formatVaultConfig(config)`

```ts
function formatVaultConfig(config: ApexVaultUserConfigParams): {
  rewardConfigs: { rewardToken: Address; bps: number }[]
  compoundBps: number
}
```

Validates and normalizes ApexVault config for calldata encoding.

## `getApexVaultCompoundBucket(veNFT)`

```ts
function getApexVaultCompoundBucket(veNFT: Address): Address
```

Returns the compound bucket sentinel address for a veNFT.

## `getUserStakedApexVaultNFTs(params)`

```ts
function getUserStakedApexVaultNFTs(params: {
  client: {
    readContract(params: {
      address: Address
      abi: readonly unknown[]
      functionName: string
      args?: readonly unknown[]
    }): Promise<unknown>
  }
  vault: Address
  owner: Address
  activeOnly?: boolean
}): Promise<bigint[]>
```

Returns the user's currently staked ApexVault veNFT token IDs.

```ts
const tokenIds = await getUserStakedApexVaultNFTs({
  client: publicClient,
  vault: apex.apexVault,
  owner: account,
})
```

The vault takes custody of a veNFT when it is staked, so wallet ERC-721 ownership alone is not enough to list staked positions. This helper is a current-state read: it scans veNFTs owned by the vault with `VeApexToken.tokenOfOwnerByIndex(vault, index)` and filters each token ID against `ApexVault.positionOwner(tokenId)`, so unstaked positions are excluded.

Set `activeOnly: true` to hide staked positions that are still custodied but inactive for rewards.

Use the ApexVault `stake` path, not a raw `safeTransferFrom` to the vault. Raw transfers do not create ApexVault position accounting and will not be returned by this helper.

## `ApexVault.stakeCallParameters(tokenId, config)`

```ts
ApexVault.stakeCallParameters(
  tokenId: BigintIsh,
  config: ApexVaultUserConfigParams
): CallParameters
```

Builds calldata to stake a veNFT into ApexVault.

## `ApexVault.setUserConfigCallParameters(tokenId, config)`

```ts
ApexVault.setUserConfigCallParameters(
  tokenId: BigintIsh,
  config: ApexVaultUserConfigParams
): CallParameters
```

Builds calldata to update reward-token and compound bps for an already-staked veNFT.

## `ApexVault.claimCallParameters(params)`

```ts
ApexVault.claimCallParameters({
  tokenId: BigintIsh
  rewardTokens: readonly Address[]
}): CallParameters
```

Builds calldata to claim selected reward tokens.

## `ApexVault.claimAndExtendLockCallParameters(params)`

```ts
ApexVault.claimAndExtendLockCallParameters({
  tokenId: BigintIsh
  rewardTokens: readonly Address[]
}): CallParameters
```

Builds calldata to claim selected reward tokens and extend the veNFT lock through ApexVault.

## `ApexVault.unstakeCallParameters(params)`

```ts
ApexVault.unstakeCallParameters({
  tokenId: BigintIsh
}): CallParameters
```

Builds calldata to unstake a veNFT.

## `ApexVault.extendLockCallParameters(params)`

```ts
ApexVault.extendLockCallParameters({
  tokenId: BigintIsh
  lockDuration: BigintIsh
}): CallParameters
```

Builds calldata to extend a veNFT lock through ApexVault.

## `ApexVault.increaseAmountCallParameters(params)`

```ts
ApexVault.increaseAmountCallParameters({
  tokenId: BigintIsh
  amount: BigintIsh
}): CallParameters
```

Builds calldata to increase the locked amount for a staked veNFT.

## VeApexToken Encoders

| Method | Purpose |
| --- | --- |
| `ApexVault.encodeVeApexTokenApprove({ tokenId, spender })` | Encode ERC-721 approval for one veNFT |
| `ApexVault.encodeVeApexTokenSetApprovalForAll(operator, approved)` | Encode ERC-721 operator approval |
| `ApexVault.encodeVeApexTokenCreateLock({ amount, lockDuration })` | Encode new veNFT lock creation |
