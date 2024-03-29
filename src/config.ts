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
  chainId: "uni-2",
  chainName: "Uni",
  rpc: "https://rpc.uni.junomint.com:443/",
  rest: "https://rpc-juno.nodes.guru/rest",
  addressPrefix: "juno",
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

const cliffnet = {
  chainId: "cliffnet-1",
  chainName: "Cliffnet",
  addressPrefix: "wasm",
  rpc: "https://rpc.cliffnet.cosmwasm.com:443/",
  rest: "https://lcd.cliffnet.cosmwasm.com/",
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "wasm",
    bech32PrefixAccPub: "wasmpub",
    bech32PrefixValAddr: "wasmvaloper",
    bech32PrefixValPub: "wasmvaloperpub",
    bech32PrefixConsAddr: "wasmvalcons",
    bech32PrefixConsPub: "wasmvalconspub"
  },
  stakeCurrency: { coinDenom: "PEBBLE", coinMinimalDenom: "upebble", coinDecimals: 6 },
  currencies: [
    { coinDenom: "PEBBLE", coinMinimalDenom: "upebble", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "PEBBLE", coinMinimalDenom: "upebble", coinDecimals: 6 },
  ],
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

const contractAddresses = {
  AUCTION_CONTRACT: 'wasm1dy8rzv9fvaehucjt0yzgs44tgpju5pc3fppd22k80pvnum4td98qel0ah7',
  CW721_CONTRACT: 'wasm1yymg0m85ysfje6dl805xr8kjtlk7krm82uked5lf9v9a9p6p9pqqarzpwm',
}

export const configs = { 
  local, 
  uninet, 
  pebblenet,
  cliffnet,
  contractAddresses
};

