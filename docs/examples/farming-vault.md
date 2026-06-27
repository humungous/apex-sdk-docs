# Farming and Vault Examples

## Classic LP farm

Classic farms are pid-based. Read or index the pid for each pair, then build calls with `ApexClassicFarm`.

```ts
import { ApexClassicFarm } from '@apex_labs/sdk'

const stake = ApexClassicFarm.depositCallParameters({
  pid,
  amount,
})

const claim = ApexClassicFarm.harvestCallParameters({
  pid,
})

const exit = ApexClassicFarm.withdrawCallParameters({
  pid,
  amount,
})
```

## CL NFT farm

CL farming works with position NFTs. The SDK encodes the safe periphery paths so the UI does not assemble Chef calls by hand.

```ts
import { ApexCLFarm, ApexFeeAmount } from '@apex_labs/sdk'

const { calldata, value } = ApexCLFarm.mintAndStakeCallParameters(
  {
    token0: tokenA.address,
    token1: tokenB.address,
    fee: ApexFeeAmount.FEE_0_30,
    tickLower,
    tickUpper,
    amount0Desired,
    amount1Desired,
    amount0Min,
    amount1Min,
    recipient: account,
    deadline,
  },
  {
    refundRecipient: account,
  },
)
```

## Vault user config

Vault reward config weights must add up to `10_000` basis points.

```ts
import {
  ApexVaultPosition,
  validateApexVaultUserConfig,
} from '@apex_labs/sdk'

const config = {
  rewardConfigs: [
    {
      rewardToken,
      compoundWeight: 7_000,
      claimableWeight: 3_000,
    },
  ],
}

validateApexVaultUserConfig(config)

const { calldata } = ApexVaultPosition.setUserConfigCallParameters({
  tokenId,
  ...config,
})
```

## Common UI states

- Classic farm: pair address, pid, LP balance, staked balance, pending reward.
- CL farm: NFT position, staked owner, liquidity, tick range, pending reward.
- Vault: veNFT token id, lock expiry, configured reward tokens, claimable/compound split.

