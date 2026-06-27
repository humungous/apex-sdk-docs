# ApexVault Examples

## User Config

ApexVault reward config weights must add up to `10_000` basis points.

```ts
import {
  ApexVault,
  validateApexVaultUserConfig,
} from '@apex_labs/sdk'

const config = {
  rewardConfigs: [
    {
      rewardToken,
      bps: 3_000,
    },
  ],
  compoundBps: 7_000,
}

validateApexVaultUserConfig(config)

const { calldata } = ApexVault.setUserConfigCallParameters(tokenId, config)
```

## Required State

| Field | Meaning |
| --- | --- |
| veNFT token id | ApexVault position identifier |
| lock expiry | veNFT unlock timestamp |
| reward tokens | tokens configured for direct claim |
| claim bps | reward-token basis points routed to the user |
| compound bps | basis points routed into compounding |
