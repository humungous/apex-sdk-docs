# ApexVault

ApexVault manages veNFT reward configuration, claiming, compounding, and lock extension. It is separate from Classic and CL farming.

## Contracts

| Contract | Role |
| --- | --- |
| `ApexVault` | Manages veNFT reward configuration and ApexVault actions |
| `VeApexToken` | Vote-escrow NFT lock token |
| `ApexToken` | Reward and governance token |
| `ApexController` | Emits and routes protocol-level reward state |
| `EmissionCenter` | Releases vested reward tokens to the controller when needed |

## User Position

An ApexVault position is anchored to a veNFT token id. The UI should model it independently from LP balances and farm deposits.

| Field | Meaning |
| --- | --- |
| `tokenId` | veNFT identifier |
| lock expiry | veNFT unlock timestamp |
| reward tokens | tokens configured for direct claim |
| `bps` | reward-token basis points routed to the user |
| `compoundBps` | basis points routed into compounding |

Reward config weights are basis points and must add up to `10_000` for each reward token.

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

## Integration Rules

- Keep ApexVault state in a dedicated route or tab.
- Validate user config before opening the wallet.
- Display reward-token bps and compound bps separately.
- Do not present ApexVault positions as Classic LP or CL NFT farm deposits.
