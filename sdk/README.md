# Paystream Smart Contracts SDK 

This is an SDK generated with dappkit-launchpad. The SDK generated could be used to deploy and interact with the 
paystream contracts.

## Compile Contracts

```
npm run compile
```

## Generate the SDK 

```
npm run build 
```

## Packing the SDK

```
npm run build && npm pack
```

## Deploy the Contracts


```
# network = hardhat| kovan | iris ...
npx hardhat run --network <network> scripts/deploy.ts
```