import { useEffect, useState } from "react";
import { OfflineSigner } from "@cosmjs/launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { configs } from "../config";

export function useKeplr() {

  // state vars
  const [account, setAccount] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [signer, setSigner] = useState<OfflineSigner>();
  const [client, setClient] = useState<SigningCosmWasmClient>();
  const [addressPrefix, setAddressPrefix] = useState<string>("");
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
      const chainId = chainConfig.chainId;
      await keplr.enable(chainId);
      const offlineSigner = await keplr.getOfflineSignerAuto(chainId);
      const accounts = await offlineSigner.getAccounts();

      // setup client with rpc and signer
      const client = await SigningCosmWasmClient.connectWithSigner(
        chainConfig.rpc, 
        offlineSigner
      );

      // update state vars
      setAccount(accounts[0].address);
      setAddressPrefix(chainConfig.addressPrefix);
      setSigner(offlineSigner);
      setClient(client);
      setActive(true);

      console.log("keplr activated");
    }
  }

  return { 
    activateBrowserWallet, 
    addressPrefix,
    account,
    active,
    signer,
    client
  }

}