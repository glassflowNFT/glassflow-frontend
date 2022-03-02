import gradient from 'random-gradient';
import "./user.css";
import { useEffect, useState } from "react";
import { HelpCircle } from "react-feather";
// import useInterval from "../../components/useInterval";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
// import { calculateFee, GasPrice } from "@cosmjs/stargate";
import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { auth, db } from "../../firebase-config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ReactTooltip from "react-tooltip";
import { configs } from '../../config';
import { NFT_PREVIEW_DATA } from '../../interfaces';

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };

export default function User() {

  const [selectedFilter, setSelectedFilter] = useState<"owned" | "created" | "listed">("owned");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client, readOnlyClient } = useSharedKeplr();
  const navigate = useNavigate();
  
  // user profile data
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [items, setItems] = useState<NFT_PREVIEW_DATA[]>([]);
  // eslint-disable-next-line
  const [rewardAvailable, setRewardAvailable] = useState<boolean>(false);

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    getUserData();
    getUserItems();
    // eslint-disable-next-line
  }, [account, client, readOnlyClient]);

  const getUserData = async () => {
    // const x = await client.getHeight();
    // const x = await client.getChainId()
    // console.log(x)
    const path = window.location.pathname;
    const uid = path.substring(path.lastIndexOf("/") + 1);
    // get db reference to current user
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (auth) {
      setIsOwner(auth.currentUser?.uid === uid)
    }
    if (docSnap.exists()) {
      const data = docSnap.data();
      setDisplayName(data.displayName);
      setBio(data.bio);
      // console.log("Document data:", docSnap.data());
    } 
  }

  const setFilter = (e: any) => {
    setSelectedFilter(e.target.innerHTML.toLowerCase());
  }

  const userItemClicked = () => {
    navigate("/asset/xyz");
  }

  const getUserItems = async () => {

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
          console.log(queryResult)
          // filter by owned NFTs
          if (queryResult.owner === account) {
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
    }

    setItems(nfts);

  }

  const renderRewardsButton = () => {
    return(
      <div className="user-reward-wrapper">
        <ReactTooltip id='rewards-tool-tip'>
          <span>Users that create new collections are given rewards</span>
        </ReactTooltip>
        <button 
          className="primary-button"
          disabled={!rewardAvailable}
        >
          {rewardAvailable ? 'Claim Reward' : 'No Rewards Available'}
        </button>
        <HelpCircle data-tip data-for='rewards-tool-tip'/>
      </div>
    );
  }

  return (
    <div className="user-wrapper page-wrapper">
      <section className="user-info-wrapper">
        <div className="profile-wrapper" style={bgGradient}></div>
        <section className="user-info">
          <div>
            <span className="user-name">
              {displayName} 
            </span>
          </div>
          <p className="user-bio secondary">
            {bio}
          </p>
          {isOwner && renderRewardsButton()}
        </section>
      </section>
      <section className="content-filter-wrapper">
        <button
          className={`content-filter ${
            selectedFilter === "owned" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Owned
        </button>
        <button
          className={`content-filter ${
            selectedFilter === "created" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Created
        </button>
        <button
          className={`content-filter ${
            selectedFilter === "listed" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Listed
        </button>
      </section>
      <div className="cards-container">
        <CardGallery
          cardClicked={userItemClicked}
          items={items}
        />
      </div>
    </div>
  );
}