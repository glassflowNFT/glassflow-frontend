import { useCallback } from "react";

export function useKeplr() {

  const result = {
    account: null,
    active: false,
    activate: async () => {
      const globalWindow:any = window;
      if (globalWindow.keplr) {
        const keplr = globalWindow.keplr;
        const chainId = "cosmoshub-4";
        await keplr.enable(chainId);
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        result.account = accounts[0];
        result.active = true;
        console.log("keplr activated");
      }
    }
  }

  // activate kepler
  const activateBrowserWallet = useCallback(async() => {
    await result.activate();
    return result.account;
  // eslint-disable-next-line
  }, []);

  return { ...result, activateBrowserWallet }

}