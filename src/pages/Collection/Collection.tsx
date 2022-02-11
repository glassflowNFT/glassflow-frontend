import { generateSentences, generateWords } from "../../components/LoremIpsum";
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

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };
const words = generateWords(2);
const sentence = generateSentences(5);

export default function Collection() {

  // eslint-disable-next-line
  const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");
  // eslint-disable-next-line
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client } = useSharedKeplr();
  const navigate = useNavigate();

  useEffect(() => {
    // check if the current user is the owner of this page
    // TODO: have user sign message to prove ownership
    getAccountData()
    // eslint-disable-next-line
  }, [account, client]);

  const getAccountData = async () => {
    if (client) {
      // const x = await client.getHeight();
      // const x = await client.getChainId()
      // console.log(x)
    }
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

  const collectionItemClicked = () => {
    navigate("/asset/xyz");
  }

  return (
    <div className="collection-wrapper page-wrapper">
      <section className="collection-info-wrapper">
        <div className="collection-profile-wrapper" style={bgGradient}></div>
        <section className="collection-info">
          <div>
            <span className="collection-name">
              {words} {isOwner && <Edit/>}
            </span>
          </div>
          <p className="collection-bio secondary">
            {sentence} {isOwner && <Edit/>}
          </p>
        </section>
      </section>
      <section className="collection-stats-wrapper">
        <div className="collection-creator">
          <span className="stat-title">Created By</span>
          <span className="stat-text secondary">0xd10c833f4305e1053a64bc738c550381f48104ca</span>
        </div>
        <div className="collection-stats">
          <div className="collection-stat-container">
            <span className="stat-title">123</span>
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
        />
      </div>
    </div>
  );
}