import gradient from 'random-gradient';
import "./collection.css";
import { useEffect, useState } from "react";
import { Edit } from "react-feather";
// import useInterval from "../../components/useInterval";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
// import { calculateFee, GasPrice } from "@cosmjs/stargate";
import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { configs } from "../../config";
import { NFT_PREVIEW_DATA } from "../../interfaces";

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };

export default function Collection() {

  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client, readOnlyClient } = useSharedKeplr();
  const navigate = useNavigate();

  // eslint-disable-next-line
  const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");
  // eslint-disable-next-line
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>();
  const [collectionDescription, setCollectionDescription] = useState<string>();
  const [collectionOwner, setCollectionOwner] = useState<string>();
  // eslint-disable-next-line
  const [collectionAddress, setCollectionAddress] = useState<string>();
  const [collectionItems, setCollectionItems] = useState<NFT_PREVIEW_DATA[]>([]);

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    getCollectionData()
    // eslint-disable-next-line
  }, [account, client, readOnlyClient]);

  const getCollectionData = async () => {
    let path = window.location.pathname.split("/");
    const address = path[path.length-1];

    // load collection data from db
    const docRef = doc(db, "collections", address);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      //
      loadCollectionItems(data);

      // update state vars
      setCollectionName(data.name);
      setCollectionAddress(data.collectionAddress);
      setCollectionDescription(data.collectionDescription);
      setCollectionOwner(data.ownerWalletAddress);
    }
  }

  const loadCollectionItems = async (collection: any) => {
    if (!readOnlyClient) return;
    let nfts:NFT_PREVIEW_DATA[] = [];
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

    // update state vars
    setCollectionItems(nfts);
  }

  const collectionItemClicked = (item: any) => {
    navigate(`/asset/${item.address}/${item.tokenId}`);
  }

  return (
    <div className="collection-wrapper page-wrapper">
      <section className="collection-info-wrapper">
        <div className="collection-profile-wrapper" style={bgGradient}></div>
        <section className="collection-info">
          <div>
            <span className="collection-name">
              {collectionName} {isOwner && <Edit/>}
            </span>
          </div>
          <p className="collection-bio secondary">
            {collectionDescription} {isOwner && <Edit/>}
          </p>
        </section>
      </section>
      <section className="collection-stats-wrapper">
        <div className="collection-creator">
          <span className="stat-title">Created By</span>
          <span className="stat-text secondary">{collectionOwner}</span>
        </div>
        <div className="collection-stats">
          <div className="collection-stat-container">
            <span className="stat-title">{collectionItems.length}</span>
            <span className="stat-text secondary">Items</span>
          </div>
          <div className="collection-stat-container">
            <span className="stat-title">30</span>
            <span className="stat-text secondary">Sales</span>
          </div>
          <div className="collection-stat-container">
            <span className="stat-title">1.00</span>
            <span className="stat-text secondary">Floor Price</span>
          </div>
        </div>
      </section>
      <div className="cards-container">
        <CardGallery
          cardClicked={collectionItemClicked}
          items={collectionItems}
        />
      </div>
    </div>
  );
}