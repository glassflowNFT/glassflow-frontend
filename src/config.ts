const local = {
  chainId: "testing",
  chainName: "Testing",
  addressPrefix: "wasm",
  rpcUrl: "http://localhost:26659",
  httpUrl: "http://localhost:1317",
  faucetUrl: "http://localhost:8000",
  feeToken: "ucosm",
  stakingToken: "uatom",
  coinMap: {
    ucosm: { denom: "COSM", fractionalDigits: 6 },
    uatom: { denom: "ATOM", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
};

const uninet = {
  chainId: "uni",
  chainName: "Uni",
  rpc: "https://rpc-juno.nodes.guru/",
  rest: "https://rpc-juno.nodes.guru/rest",
  stakeCurrency: {
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6
  },
  currencies: [{
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6
  }],
  feeCurrencies: [{
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6
  }],
};

const pebblenet = {
  chainId: "pebblenet-1",
  chainName: "Pebblenet",
  addressPrefix: "wasm",
  rpc: "https://rpc.pebblenet.cosmwasm.com",
  rest: "https://rpc.pebblenet.cosmwasm.com/rest",
  httpUrl: "https://lcd.pebblenet.cosmwasm.com",
  faucetUrl: "https://faucet.pebblenet.cosmwasm.com",
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "cosmos",
    bech32PrefixAccPub: "cosmospub",
    bech32PrefixValAddr: "cosmosvaloper",
    bech32PrefixValPub: "cosmosvaloperpub",
    bech32PrefixConsAddr: "cosmosvalcons",
    bech32PrefixConsPub: "cosmosvalconspub"
  },
  stakeCurrency: {
    coinDenom: "JUNOX",
    coinMinimalDenom: "ujunox",
    coinDecimals: 6
  },
  currencies: [
    { coinDenom: "ROCK", coinMinimalDenom: "urock", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "PEBBLE", coinMinimalDenom: "upebble", coinDecimals: 6 },
  ],
};

export const configs = { local, uninet, pebblenet };

