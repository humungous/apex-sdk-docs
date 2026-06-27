# Troubleshooting

## `npm install` shows Node engine warnings

Some transitive dependencies prefer Node 20+. Use Node 20+ for app and docs development where possible.

## Quotes differ from on-chain output

Check these first:

- reserves or CL slot state are stale
- token decimals are wrong
- Classic stable/volatile flag is wrong
- CL fee tier is wrong
- route token order is wrong
- slippage and fee-on-transfer behavior are not accounted for

## Pool address is wrong

For CL pools, make sure `clPoolDeployer` is configured. CL addresses are derived from the deployer, not only the factory.

For Classic pools, make sure `classicPairInitCodeHash` matches the deployed bytecode.

## Mixed route reverts

Mixed route hops must be continuous:

```text
tokenA -> tokenB -> tokenC
```

The output token of each hop must equal the input token of the next hop.

## SmartRouter calldata reverts

Check:

- deadline has not expired
- allowance is set for the router
- recipient is not zero
- `amountOutMinimum` is realistic
- native token cleanup matches route type
- path encoding matches Classic stable/volatile or CL fee tier

## TypeScript cannot find exports

Make sure the app imports from the package root:

```ts
import { ApexSmartRouter } from '@apex_labs/sdk'
```

Do not import from internal package paths. They are not part of the public API.

