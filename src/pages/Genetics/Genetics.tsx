import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import { useEffect, useState } from "react";
import { configs } from "../../config";
import { NFT_PREVIEW_DATA } from "../../interfaces";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function Genetics() {
  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { client, readOnlyClient } = useSharedKeplr();
  const [items, setItems] = useState<NFT_PREVIEW_DATA[]>([]);

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line
  }, [client, readOnlyClient]);

  const collectionClicked = (item: any) => {
    navigate(`/asset/${item.address}/${item.tokenId}`);
  }

  const fetchItems = async () => {

    if (!readOnlyClient) return;

    let collections:any[] = [];
    let nfts:NFT_PREVIEW_DATA[] = [];

    // get all collections
    const collectionsRef = collection(db, "collections");
    const q = query(collectionsRef, where("collectionAddress", "!=", ""))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // add to list
      if (doc.data())
        collections.push(doc.data());
    });

    // iterate through all tokens that are returned
    for (const collection of collections) {
      // get all saved NFTs
      const result = await readOnlyClient.queryContractSmart(
        configs.contractAddresses.AUCTION_CONTRACT, 
        {
          "all_tokens": { 
            "nft_addr": collection.collectionAddress
          }
        }
      );
      if (result.length > 0) {
        for (const tokenId of result) {
          // query contract for NFTs in all collections
          const queryResult = await readOnlyClient.queryContractSmart(
            configs.contractAddresses.AUCTION_CONTRACT,
            {
              query_nft_info: {
                token_id: tokenId,
                nft_addr: collection.collectionAddress
              }
            }
          )
          // add new NFT data to preview array
          nfts.push({
            name: queryResult.extension.name,
            description: queryResult.extension.description,
            imageURL: queryResult.image_url,
            collection: collection.name,
            address: collection.collectionAddress,
            tokenId: tokenId,
            owner: queryResult.owner
          });
        }
      }
    }

    // update state var
    setItems(nfts);
  }

  return(
    <div className="page-wrapper">
      <h1>Explore All Gentics NFTs</h1>
      <p className="secondary">Explore all of our Genetics NFT (gNFTS). Click on one to view the Birth Certificate</p>
      <CardGallery
        cardClicked={collectionClicked}
        items={items}
      />
    </div>
  );
}
