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
import { doc, getDoc } from "firebase/firestore";
import ReactTooltip from "react-tooltip";

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };

export default function User() {

  const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client } = useSharedKeplr();
  const navigate = useNavigate();
  
  // user profile data
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  // eslint-disable-next-line
  const [rewardAvailable, setRewardAvailable] = useState<boolean>(false);

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    getUserData();
    // eslint-disable-next-line
  }, [account, client]);

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

  /*
  const buttonClicked = async () => {
    if (!client) return;
    const gasPrice = GasPrice.fromString("0.025ujunox");
    const executeFee = calculateFee(300_000, gasPrice);
    const result = await client.execute(
      account,
      'wasm1u5c8xtefpdyhfdrzquhhepc7jqacmrahndczn3', 
      {increment: {}}, 
      executeFee
    );
    console.log(result);
  }
  */

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
        />
      </div>
    </div>
  );
}