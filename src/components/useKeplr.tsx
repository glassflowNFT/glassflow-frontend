import { useState } from "react";
import { OfflineSigner, SigningCosmosClient } from "@cosmjs/launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export function useKeplr() {

  // state vars
  const [account, setAccount] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [signer, setSigner] = useState<OfflineSigner>();
  const [client, setClient] = useState<SigningCosmosClient | SigningCosmWasmClient>();

  // activate kepler
  const activateBrowserWallet = async () => { 

    // get injected keplr instance
    const globalWindow:any = window;
    if (globalWindow.keplr) {
      const keplr = globalWindow.keplr;
      const chainId = "uni";
      await keplr.enable(chainId);
      const offlineSigner = keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      // Initialize the gaia api with the offline signer that is injected by Keplr extension.
      /*
      const client:any = new SigningCosmosClient (
        "https://rpc.uni.juno.deuslabs.fi",
        accounts[0].address,
        offlineSigner,
      );
      */

      const client = await SigningCosmWasmClient.connectWithSigner(
        "https://rpc.uni.juno.deuslabs.fi", 
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