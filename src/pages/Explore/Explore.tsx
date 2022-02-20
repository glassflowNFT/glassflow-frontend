import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import { useEffect, useState } from "react";
import { configs } from "../../config";
import { NFT_PREVIEW_DATA } from "../../interfaces";

export default function Explore() {
  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { client } = useSharedKeplr();
  const [items, setItems] = useState<NFT_PREVIEW_DATA[]>([]);

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line
  }, [client]);

  const collectionClicked = (item: any) => {
    navigate(`/asset/${item.tokenId}`);
  }

  const fetchItems = async () => {
    // TODO: use public RPC if user doesn't have wallet setup
    if (!client) return;

    // get all saved NFTs
    const result = await client.queryContractSmart(
      configs.contractAddresses.AUCTION_CONTRACT, 
      {
        "all_tokens": { }
      }
    );

    let previewData:NFT_PREVIEW_DATA[] = [];

    // iterate through all tokens that are returned
    // TODO: make this asynchronous
    for (const item of result) {
      const queryResult = await client.queryContractSmart(
        configs.contractAddresses.AUCTION_CONTRACT,
        {
          query_nft_info: {
            token_id: item
          }
        }
      )
      // add new NFT data to preview array
      previewData.push({
        name: queryResult.extension.name,
        description: queryResult.extension.description,
        imageURL: queryResult.image_url,
        collection: queryResult.extension.collection,
        tokenId: item
      });
    }

    // update state
    setItems(previewData);
  }

  return(
    <div className="page-wrapper">
      <h1>Explore All NFTs</h1>
      <p className="secondary">Explore all the NFTs that have been published to GlassFlow</p>
      <CardGallery
        cardClicked={collectionClicked}
        items={items}
      />
    </div>
  );
}