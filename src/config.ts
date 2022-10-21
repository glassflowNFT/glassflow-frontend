const local = {
  chainId: "athena-1",
  chainName: "terpnet",
  addressPrefix: "terp",
  rpcUrl: "https://rpc-terp.zenchainlabs.io/",
  httpUrl: "https://api-terp.zenchainlabs.io/",
  faucetUrl: "",
  feeToken: "upersyx",
  stakingToken: "uterpx",
  coinMap: {
    uterpx: { denom: "TERPX", fractionalDigits: 6 },
    upersyx: { denom: "PERSYX", fractionalDigits: 6 },
  },
  gasPrice: 0.0333,
};

const testnet = {
  chainId: "athena-1",
  chainName: "Terp Network",
  addressPrefix: "terp",
  rpcUrl: "https://rpc-terp.zenchainlabs.io/",
  httpUrl: "https://api-terp.zenchainlabs.io/",
  faucetUrl: "",
  feeToken: "upersyx",
  stakingToken: "uterpx",
  coinMap: {
    uterpx: { denom: "TERPX", fractionalDigits: 6 },
    upersyx: { denom: "PERSYX", fractionalDigits: 6 },
  },
  gasPrice: 0.0333,
};

const athena1 = {
  chainId: "athena-1",
  chainName: "Terp Network",
  addressPrefix: "terp",
  rpc: "https://rpc-terp.zenchainlabs.io/",
  rest:"https://api-terp.zenchainlabs.io/",
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "terp",
    bech32PrefixAccPub: "terppub",
    bech32PrefixValAddr: "terpvaloper",
    bech32PrefixValPub: "terpvaloperpub",
    bech32PrefixConsAddr: "terpvalcons",
    bech32PrefixConsPub: "terpvalconspub"
  },
  stakeCurrency: { coinDenom: "PERSYX", coinMinimalDenom: "upersyx", coinDecimals: 6 },
  currencies: [
    { coinDenom: "TERPX", coinMinimalDenom: "upersyx", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "PERSYX", coinMinimalDenom: "upersyx", coinDecimals: 6 },
  ],
};

const pebblenet = {
  chainId: "athena-1",
  chainName: "Terp NEtwork ",
  addressPrefix: "terp",
  rpc: "https://rpc.pebblenet.cosmwasm.com",
  rest: "https://terp.api.bccnodes.com/",
  httpUrl: "https://terp.api.bccnodes.com/",
  faucetUrl: "",
  bip44: {
    // You can only set the coin type of BIP44.
    // 'Purpose' is fixed to 44.
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "terp",
    bech32PrefixAccPub: "terppub",
    bech32PrefixValAddr: "terpvaloper",
    bech32PrefixValPub: "terpvaloperpub",
    bech32PrefixConsAddr: "terpvalcons",
    bech32PrefixConsPub: "terpvalconspub"
  },
  stakeCurrency: {
    coinDenom: "TERPX",
    coinMinimalDenom: "uterpx",
    coinDecimals: 6
  },
  currencies: [
    { coinDenom: "TERPX", coinMinimalDenom: "uterpx", coinDecimals: 6 },
  ],
  feeCurrencies: [
    { coinDenom: "PERSYX", coinMinimalDenom: "upersyx", coinDecimals: 6 },
  ],
};

const contractAddresses = {
  AUCTION_CONTRACT: '',
  CW721_CONTRACT: '',
}

export const configs = { 
  local, 
  testnet, 
  athena1,
  pebblenet,
  contractAddresses
};

