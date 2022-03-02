export interface NFT_PREVIEW_DATA {
  name: string
  description: string
  collection: string
  // externalLink: string,
  // initPrice: string | number,
  // royalties: any[],
  address: string
  tokenId: string
  imageURL: string
  owner: string
}


export interface SELECTED_COLLECTION {
  ownerWalletAddress: string
  name: string
  collectionAddress: string
  collectionDescription: string
}