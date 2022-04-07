import gradient from 'random-gradient';
import "./user.css";
import { useEffect, useState } from "react";
import { CheckCircle, HelpCircle } from "react-feather";
// import useInterval from "../../components/useInterval";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
// import { calculateFee, GasPrice } from "@cosmjs/stargate";
import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { auth, db, storage } from "../../firebase-config";
import { collection, updateDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ReactTooltip from "react-tooltip";
import { configs } from '../../config';
import { NFT_PREVIEW_DATA } from '../../interfaces';
import { getDownloadURL, ref } from 'firebase/storage';

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };

export default function User() {

  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, readOnlyClient } = useSharedKeplr();
  const navigate = useNavigate();
  
  // user profile data
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [items, setItems] = useState<NFT_PREVIEW_DATA[]>([]);
  const [primaryWallet, setPrimaryWallet] = useState<string>();
  const [profilePicture, setProfilePicture] = useState<string>();
  const [selectedFilter, setSelectedFilter] = useState<"owned" | "created" | "listed">("owned");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  // eslint-disable-next-line
  const [rewardAvailable, setRewardAvailable] = useState<boolean>(false);
  const [userClient, setUserClient] = useState<any>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [following, setFollowing] = useState<string[]>([]);
  const [pageOwnerId, setPageOwnerId] = useState<string>();

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    getUserData();
    getClientData();
    // eslint-disable-next-line
  }, [account, readOnlyClient, userClient]);

  useEffect(() => {
    getUserItems();
  // eslint-disable-next-line
  }, [primaryWallet]);

  // get the data for the client
  const getClientData = async () =>{
    if (!userClient) return;
    const docRef = doc(db, "users", `${userClient.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // extract data
      const data = docSnap.data();
      // get page owner's uid
      const path = window.location.pathname;
      const uid = path.substring(path.lastIndexOf("/") + 1);
      // check if the user is following the owner of this page
      if (data.following.includes(uid))
        setIsFollowing(true);
      setFollowing(data.following);
    } 
  }

  // get the data for the user that owns the page
  const getUserData = async () => {
    const path = window.location.pathname;
    const uid = path.substring(path.lastIndexOf("/") + 1);
    setPageOwnerId(uid);
    // get db reference to current user
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (auth) {
      setIsOwner(auth.currentUser?.uid === uid)
      setUserClient(auth.currentUser);
    }
    if (docSnap.exists()) {
      const data = docSnap.data();
      setDisplayName(`${data.firstName} ${data.lastName}`);
      setPrimaryWallet(data.primaryWallet);
      

      // download profile URL from db
      if (data.profilePicture) {
        getDownloadURL(ref(storage, `${data.profilePicture}`))
        .then((url) => {
          setProfilePicture(url);
        });
      }
      setBio(data.bio);
    } 
  }

  const setFilter = (e: any) => {
    setSelectedFilter(e.target.innerHTML.toLowerCase());
  }

  const userItemClicked = (item: any) => {
    navigate(`/asset/${item.address}/${item.tokenId}`);
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
          // console.log(queryResult.primaryWallet)
          // filter by owned NFTs
          if (queryResult.owner === primaryWallet) {
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

  const followButtonClicked = async () => {
    if (!pageOwnerId) return;

    // get the index for the page owner if it exists
    let newFollowing = [...following];
    const followerIndex = newFollowing.indexOf(pageOwnerId);

    // remove or add page owner ID from client's follow array
    if (isFollowing) {
      newFollowing.splice(followerIndex, 1);
      setIsFollowing(false);
    } else {
      newFollowing.push(pageOwnerId);
      setIsFollowing(true);
    }

    // update db
    await updateDoc(doc(db, "users", `${userClient.uid}`), {
      following: newFollowing
    })

    getClientData();

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

  const renderFollowButton = () => {
    return(
      <div className="user-follow-wrapper">
        <button 
          className={`primary-button ${isFollowing ? 'following' : ''}`}
          onClick={followButtonClicked}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    );
  }

  return (
    <div className="user-wrapper page-wrapper">
      <section className="user-info-wrapper">
        <div className="profile-wrapper" style={bgGradient}>
          {profilePicture &&
            <img
              src={profilePicture}
              alt="profile"
            />
          }
        </div>
        <section className="user-info">
          <div>
            <span className="user-name">
              {displayName} 
              <ReactTooltip id='verified-tool-tip'>
                <span>This user has been verified</span>
              </ReactTooltip>
              <CheckCircle data-tip data-for='verified-tool-tip'/>
            </span>
          </div>
          <p className="user-bio secondary">
            {bio}
          </p>
          {isOwner && renderRewardsButton()}
          {!isOwner && renderFollowButton()}
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