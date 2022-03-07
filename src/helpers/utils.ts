export const shortenAddress = (address: string, prefix: string):string => {
  const start = address.substring(0, prefix.length + 3);
  const end = address.substring(address.length - 3);
  return(`${start}....${end}`);
}

export const promptWalletConnect = (enqueueSnackbar: any) => {
  enqueueSnackbar('Please connect your wallet to continue' ,{
    variant: "info"
  }); 
}