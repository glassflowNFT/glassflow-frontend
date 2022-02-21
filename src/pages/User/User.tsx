import gradient from 'random-gradient';
import "./user.css";
import { useEffect, useState } from "react";
import { Edit } from "react-feather";
// import useInterval from "../../components/useInterval";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
// import { calculateFee, GasPrice } from "@cosmjs/stargate";
import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };

export default function User() {

  const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const userAddress = "juno198ydmld7696w02a85tgn3aw2y99uvdg75zjty7"
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client } = useSharedKeplr();
  const navigate = useNavigate();
  
  // user profile data
  const [displayName, setDisplayName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    setIsOwner(account === userAddress)
    getUserData()
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

  return (
    <div className="user-wrapper page-wrapper">
      <section className="user-info-wrapper">
        <div className="profile-wrapper" style={bgGradient}></div>
        <section className="user-info">
          <div>
            <span className="user-name">
              {displayName} {isOwner && <Edit/>}
            </span>
            <span className="user-address secondary">
            </span>
          </div>
          <p className="user-bio secondary">
            {bio} {isOwner && <Edit/>}
          </p>
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