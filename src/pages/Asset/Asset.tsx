import { AlignLeft, Clock, Info, Star, Tag } from 'react-feather';
import { generateSentences } from '../../components/LoremIpsum';
import gradient from 'random-gradient';
import Accordion from './Accordion';
import { useNavigate } from 'react-router';
import './asset.css';
import { useEffect, useState } from 'react';
import { configs } from '../../config';
import { useBetween } from 'use-between';
import { useKeplr } from '../../components/useKeplr';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { shortenAddress } from '../../helpers/utils';

export default function Asset() {

  const count = Math.round(Math.random() * (500 - 0) + 0);
  const bgGradient = { background: gradient(count.toString()) };
  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { client, account, readOnlyClient, chainConfig } = useSharedKeplr();

  const [assetName, setAssetName] = useState<string>();
  const [assetDescription, setAssetDescription] = useState<string>();
  const [assetCollectionName, setAssetCollectionName] = useState<string>();
  const [assetCollectionDescriptions, setAssetCollectionDescription] = useState<string>();
  const [assetCollectionAddress, setAssetCollectionAddress] = useState<string>("");
  const [assetCollectionId, setAssetCollectionId] = useState<string>("");
  const [assetOwner, setAssetOwner] = useState<string>();
  const [assetListed, setAssetListed] = useState<boolean>();
  // eslint-disable-next-line
  const [assetListingPrice, setAssetListingPrice] = useState<string>();

  useEffect(() => {
    loadAssetData();
    getAuctionItems();
  // eslint-disable-next-line
  }, [readOnlyClient]);

  const loadAssetData = async () => {

    if (!readOnlyClient) return;

    // extract some asset data from url
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];
    const collectionAddress = path[path.length - 2];

    // query contract for asset data
	  const query = await readOnlyClient.queryContractSmart(
      configs.contractAddresses.AUCTION_CONTRACT, {
        "query_nft_info": {
          "token_id": id,
          "nft_addr": collectionAddress
        }
      }
    );


    // get the collection info for the asset
    const docRef = doc(db, "collections", collectionAddress);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setAssetCollectionAddress(data.collectionAddress);
      setAssetCollectionName(data.name);
      setAssetCollectionDescription(data.collectionDescription);
    } 

    // update state vars
    setAssetName(query.extension.name);
    setAssetDescription(query.extension.description);
    setAssetOwner(query.owner);
    setAssetListed(query.is_listing);
    setAssetListingPrice(query.listing_price);
    setAssetCollectionId(id);
  }

  const getAuctionItems = async() => {
    if (!readOnlyClient) return;
    // const client = await CosmWasmClient.connect(rpcEndpoint);
	  const query_result = await readOnlyClient.queryContractSmart(
      configs.contractAddresses.AUCTION_CONTRACT, 
      {
          "all_auction_ids": { }
      } );
	  console.info("query result", query_result);
  }

  const placeListing = async () => {

    if (!client) return;

    const gasPrice = GasPrice.fromString("0.05upebble");
    const executeFee = calculateFee(400_000, gasPrice);

    // transfer ownership to auction contract
    await client.execute(
      account,
      assetCollectionAddress,
      {
        approve: {
          spender: configs.contractAddresses.AUCTION_CONTRACT,
          token_id: assetCollectionId,
        }
      },
      executeFee,
      "",
      []
    )

    const create_result = await client.execute(
      account,
      configs.contractAddresses.AUCTION_CONTRACT,
      {
        place_listing: {
          id: assetCollectionId,  //nft address
          minimum_bid: {
              amount: "12000",
              info: {
                native_token: {
                    denom: "upebble"
                }
              },
          },
          nft_addr: assetCollectionAddress 
        }
      },
      executeFee,
      "",
      []
    );
    console.log("res: ", create_result);
  }

  const renderOfferButton = () => {
    let text = '';
    console.log(assetOwner)
    if (assetOwner === account) {
      text = assetListed ? 'Remove Listing' : 'Create Listing';
    } else {
      text = 'Place Bid';
    }
    return(
      <button 
        className="primary-button"
        onClick={placeListing}
      >
        {text}
      </button>
    )
  }

  return(
    <div className="asset-wrapper page-wrapper">
      <section className="asset-left">
        <div className="asset-image-wrapper" style={bgGradient}></div>
        <Accordion
          icon={<Star/>}
          title="Properties"
        >
        </Accordion>
        <Accordion
          icon={<Info/>}
          title="Details"
          startOpen={true}
        >
          <span className="secondary">
            {generateSentences(2)}
          </span>
        </Accordion>
      </section>
      <section className="asset-right">
        <section className="asset-info-wrapper">
          <div>
            <span 
              className="asset-info-title asset-collection-link"
              onClick={() => navigate(`/collection/${assetCollectionAddress}`)}
            >
              {assetCollectionName}
            </span>
            <span 
              className="asset-info-text"
            >
              {assetName}
            </span>
          </div> 
          <div className="asset-info-right">
            <span 
              className="asset-info-title">Owner</span>
            <span 
              className="asset-info-text asset-owner-link"
              onClick={() => navigate("/user/xyz")}
            >
              {shortenAddress(assetOwner || "", chainConfig.addressPrefix)}
            </span>
          </div> 
        </section>
        <Accordion
          icon={<Tag/>}
          title="Highest Offer"
          startOpen={true}
        >
          <div className="item-offer-wrapper">
            <span className="secondary">
              12.34 $XYZ
            </span>
            
            {renderOfferButton()}
          </div>
        </Accordion>
        <Accordion
          icon={<Tag/>}
          title="Asset Description"
          startOpen={true}
        >
          <span className="secondary">
            {assetDescription}
          </span>
        </Accordion>
        <Accordion
          icon={<Clock/>}
          title="Sale History"
        >
          <span className="secondary">
            No sale history available for this item
          </span>
        </Accordion>
        <Accordion
          icon={<AlignLeft/>}
          title="Collection Description"
        >
          <span className="secondary">
            {assetCollectionDescriptions}
          </span>
        </Accordion>
      </section>
    </div>
  );
}