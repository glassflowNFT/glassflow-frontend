export const shortenAddress = (address: string, prefix: string) => {
  const start = address.substring(0, prefix.length + 4);
  const end = address.substring(address.length - 4);
  return(`${start}....${end}`);
}