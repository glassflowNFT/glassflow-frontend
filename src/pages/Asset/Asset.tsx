import { AlignLeft, Clock, DollarSign, Info, Star, Tag } from 'react-feather';
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
import { promptWalletConnect, shortenAddress } from '../../helpers/utils';
import { useSnackbar } from 'notistack';

export default function Asset() {

  const count = Math.round(Math.random() * (500 - 0) + 0);
  const bgGradient = { background: gradient(count.toString()) };
  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { client, account, readOnlyClient, chainConfig } = useSharedKeplr();
  const { enqueueSnackbar } = useSnackbar();

  const [assetName, setAssetName] = useState<string>();
  const [assetDescription, setAssetDescription] = useState<string>();
  const [assetCollectionName, setAssetCollectionName] = useState<string>();
  const [assetCollectionDescriptions, setAssetCollectionDescription] = useState<string>();
  const [assetCollectionAddress, setAssetCollectionAddress] = useState<string>("");
  const [assetCollectionId, setAssetCollectionId] = useState<string>("");
  const [assetOwner, setAssetOwner] = useState<string>();
  const [assetListed, setAssetListed] = useState<boolean>();
  const [assetListingPrice, setAssetListingPrice] = useState<{amount: string, info:{native_token: any}}>();
  const [assetListingPriceInput, setAssetListingPriceInput] = useState<string>();
  const [assetBidPriceInput, setAssetBidPriceInput] = useState<string>();
  const [auctionId, setAuctionId] = useState<string>();

  useEffect(() => {
    loadAssetData();
  // eslint-disable-next-line
  }, [readOnlyClient, navigate]);

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
    if (query.owner !== configs.contractAddresses.AUCTION_CONTRACT)
      setAssetOwner(query.owner);
    setAssetListed(query.is_listing);
    setAssetListingPrice(query.listing_price);
    setAssetCollectionId(id);
    getAuctionData();
  }

  const getAuctionData = async() => {
    if (!readOnlyClient) return;

    const path = window.location.pathname.split("/");
    const currentId = path[path.length - 1];

    // const client = await CosmWasmClient.connect(rpcEndpoint);
	  const auctionIds = await readOnlyClient.queryContractSmart(
      configs.contractAddresses.AUCTION_CONTRACT, 
      {
        "all_auction_ids": { }
      } 
    );

    for (const id of auctionIds) {
      const auctionQuery = await readOnlyClient.queryContractSmart(
        configs.contractAddresses.AUCTION_CONTRACT,
        {
          "resolve_listing": {
            id: id
          }
        }
      )
      // console.log(auctionQuery)
      // found the correct listing
      if (auctionQuery.token_id === currentId) {
        setAssetOwner(auctionQuery.seller);
        setAuctionId(id);
        return;
      }
    }
  }

  const placeListing = async () => {

    if (!client || !account) 
      return promptWalletConnect(enqueueSnackbar);
    else if (!assetListingPriceInput || assetListingPriceInput === "") 
      return enqueueSnackbar('Please enter a valid listing price', {variant: "error"});

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
              amount: assetListingPriceInput,
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


  const bidListing = async () => {

    if (!client || !account) return promptWalletConnect(enqueueSnackbar);

    const gasPrice = GasPrice.fromString("0.05upebble");

    const executeFee = calculateFee(400_000, gasPrice);
    const create_result = await client.execute(
        account, 
        configs.contractAddresses.AUCTION_CONTRACT,  
        {
          bid_listing: {
            listing_id: auctionId,  //nft address
            bid_price: {
              amount: assetBidPriceInput,
              info: {
                  // token: {
                  //     contract_addr: "terraxxx"
                  // },
                  native_token: {
                      denom: "upebble"
                  }
              },                   
            },
        }
        },
        executeFee,
        "",
        [{denom: "upebble", amount: assetBidPriceInput || "0"}]
    );
    console.log("res: ", create_result);
    loadAssetData();
  }

  const removeListing = async () => {

    if (!client || !account) return promptWalletConnect(enqueueSnackbar);

    const gasPrice = GasPrice.fromString("0.05upebble");
    const executeFee = calculateFee(400_000, gasPrice);

    const create_result = await client.execute(
      account,
      configs.contractAddresses.AUCTION_CONTRACT,  
      {
        withdraw_listing: {
          listing_id: auctionId,  //nft address
        }
      },
      executeFee,
      "",
      []
    );
    console.log("res: ", create_result);
    loadAssetData();
  }

  const renderOfferButton = () => {
    let text = '';
    let action;
    if (assetOwner === account) {
      text = assetListed ? 'Remove Listing' : 'Create Listing';
      action = assetListed ? () => removeListing() : () => placeListing();
    } else {
      text = 'Place Bid';
      action = () => bidListing();
    }
    return(
      <button 
        className="primary-button"
        onClick={action}
      >
        {text}
      </button>
    )
  }

  const renderListingPriceInfo = () => {
    if (assetOwner === account && !assetListed) {
      return (
        <input 
          placeholder='Insert Listing Price'
          className="listing-price-input"
          value={assetListingPriceInput}
          onChange={(e) => setAssetListingPriceInput(e.target.value)}
        ></input>
      );
    } else {
      const priceText = assetListingPrice 
        ? `${assetListingPrice.amount} ${assetListingPrice.info.native_token.denom}`
        : 'No listing price available';
      return (
        <span className="secondary">
          {priceText}
          {assetOwner !== account &&
            <input 
              placeholder='Insert Bid Price'
              className="listing-price-input"
              value={assetBidPriceInput}
              onChange={(e) => setAssetBidPriceInput(e.target.value)}
            />
          }
        </span>
      )
    }
  }

  const renderAssetInfo = () => {
    return(
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
    );
  }

  return(
    <div className="asset-wrapper page-wrapper">
      <section className="asset-left">
        {renderAssetInfo()} 
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
        {renderAssetInfo()} 
        <Accordion
          icon={<DollarSign/>}
          title="Listing Info"
          startOpen={true}
        >
          <div className="item-offer-wrapper">
            {renderListingPriceInfo()}            
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