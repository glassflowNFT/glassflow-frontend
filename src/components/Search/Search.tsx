import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Search as SearchIcon } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useBetween } from "use-between";
import { configs } from "../../config";
import { db } from "../../firebase-config";
import { NFT_PREVIEW_DATA } from "../../interfaces";
import { useKeplr } from "../useKeplr";
import "./search.css";

export default function Search() {

  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const [items, setItems] = useState<any[]>([]);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { readOnlyClient } = useSharedKeplr();

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

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line
  }, []);

  const itemClicked = (item: any) => {
    // extract id and address
    const tokenId = item.tokenId;
    const address = item.address;
    // clear search input
    setSearchValue("");
    navigate(`/asset/${address}/${tokenId}`);
  }

  return (
    <div className="top-search-wrapper">
      <SearchIcon />
      <input
        placeholder="Search for item or collections names"
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        onInput={(e: any) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      {(inputFocus || searchValue !== "") &&
        <div className="search-results-wrapper">
          {items.map((item: any, index: number) => (
            item.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 && searchValue !== "" &&
            <div 
              className="search-result" 
              key={index}
              onClick={() => itemClicked(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      }
    </div>
  );
}