import { useEffect, useState } from "react";
import { OfflineSigner, SigningCosmosClient } from "@cosmjs/launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { configs } from "../config";

export function useKeplr() {

  // state vars
  const [account, setAccount] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [signer, setSigner] = useState<OfflineSigner>();
  const [client, setClient] = useState<SigningCosmosClient | SigningCosmWasmClient>();
  // const [chainId, setChainId] = useState<string>();

  useEffect(() => {
    window.addEventListener("keplr_keystorechange", () => {
      activateBrowserWallet();  
    })
  }, []);

  // activate kepler
  const activateBrowserWallet = async () => { 

    // get injected keplr instance
    const globalWindow:any = window;
    if (globalWindow.keplr) {
      const keplr = globalWindow.keplr;
      const chainConfig = configs.uninet;
      await keplr.experimentalSuggestChain(chainConfig);
      // console.log(configs.pebblenet);
      const chainId = chainConfig.chainId;
      await keplr.enable(chainId);
      const offlineSigner = keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      const client = await SigningCosmWasmClient.connectWithSigner(
        chainConfig.rpc, 
        accounts[0]
      );

      // update state vars
      setAccount(accounts[0].address);
      setSigner(offlineSigner);
      setClient(client);
      setActive(true);

      console.log("keplr activated");
    }
  }

  return { 
    activateBrowserWallet, 
    account,
    active,
    signer,
    client
  }

}