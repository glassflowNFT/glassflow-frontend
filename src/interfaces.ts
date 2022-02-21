export interface NFT_PREVIEW_DATA {
  name: string,
  description: string,
  collection: string,
  // externalLink: string,
  // initPrice: string | number,
  // royalties: any[],
  tokenId: string,
  imageURL: string,
}


export interface SELECTED_COLLECTION {
  ownerWalletAddress: string;
  name: string;
}