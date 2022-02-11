import React, { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown, Image, PlusCircle } from "react-feather";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import "./mint.css";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

export default function Mint() {

  const [creators, setCreators] = useState<[string, number][]>([["", 100]]);
  const [showCollections, setShowCollections] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<string>("No Collection");
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client, activateBrowserWallet } = useSharedKeplr();

  // form data
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [externalLink, setExternalLink] = useState<string>("");
  const [numRepresentations, setNumRepresentations] = useState<number>(0);
  const [numCollectibles, setNumCollectibles] = useState<number>(0);
  const [initialAskPrice, setInitialAskPrice] = useState<number>(0);

  const updateFormData = (set: Dispatch<SetStateAction<any>>, value: any)=> {
    set(value);
  }

  // update any changes
  const updateCreators = (e: any, index: number, id: number) => {
    // make copy of creators state var
    let newCreators = [...creators];
    // update creator wallet address or revenue
    if (id === 0) {
      const oldData = creators[index];
      newCreators[index] = [e.target.value, oldData[1]];
    } else {
      const oldData = creators[index];
      newCreators[index] = [oldData[0], e.target.value];
    }
    // update state
    setCreators(newCreators);
  }

  const updateSelectedCollection = (e: any) => {
    setSelectedCollection(e.target.innerHTML);
  }

  const getCollections = () => {
    if (showCollections)
    return(
      <div className="user-collections-wrapper">
        <div className="user-collection" onClick={updateSelectedCollection}>No Collection</div>
        <div className="user-collection" onClick={updateSelectedCollection}>Collection A</div>
        <div className="user-collection" onClick={updateSelectedCollection}>Collection B</div>
        <div className="user-collection" onClick={updateSelectedCollection}>Collection C</div>
        <div className="user-collection" onClick={updateSelectedCollection}>Collection D</div>
        <div className="user-collection">
          <PlusCircle/>
          Create New Collection
        </div>
      </div>
    );
  }

  // add a new creator + revenue share to the list
  const addNewCreator = () => {
    let newCreators = [...creators];
    newCreators.push(["", 0]);
    setCreators(newCreators);
  }

  const createItem = async () => {
    // ask user to connect wallet before continuing
    if (!account) {
      await activateBrowserWallet();
      return;
    }
    // if no client, exit 
    if (!client) return;
    const gasPrice = GasPrice.fromString("0.0025ujunox");
    const executeFee = calculateFee(300_000, gasPrice);
    const result = await client.execute(
      account,
      '', 
      { increment: {} }, 
      executeFee
    );
    console.log(result);
  }

  return (
    <div className="mint-wrapper page-wrapper">
      <div className="mint-header">
        <h1>Mint New Item</h1>
        <span className="secondary">
          <b>*</b> Required Fields
        </span>
      </div>
      <section className="auth-field-section">
        <span>Image or Video</span>
        <div className="file-selector-wrapper">
          <input
            className="file-selector"
            type="file"
            accept=".jpg, .jpeg, .png"
          ></input>
          <Image />
        </div>
        <span className="secondary hint">
          File types supported: JPG, JPEG, PNG
        </span>
      </section>
      <section className="mint-input-section">
        <span>
          Name <b>*</b>
        </span>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e: any) => updateFormData(setName, e.target.value)}
        ></input>
      </section>
      <section className="mint-input-section">
        <span>External Link</span>
        <span className="hint secondary">
          This link will be displayed on the item’s detail page so that users
          can learn more about your item. You are free to put any link to any
          page or content that you see fit.
        </span>
        <input 
          placeholder="https://link.com/path/to/data" 
          type="url"
          value={externalLink}
          onChange={(e: any) => updateFormData(setExternalLink, e.target.value)}
        ></input>
      </section>
      <section className="mint-input-section">
        <span>Description</span>
        <span className="hint secondary">
          The description will be included on the item's detail page underneath
          its image
        </span>
        <textarea 
          placeholder="Detailed description of your item"
          value={description}
          onChange={(e: any) => updateFormData(setDescription, e.target.value)}
        ></textarea>
      </section>
      <section className="mint-input-section">
        <span>Collection</span>
        <span className="hint secondary">
          This is the collection your item will be grouped with
        </span>
        <div
          className="collection-dropdown"
          onClick={() => setShowCollections(!showCollections)}
        >
          <span>{selectedCollection}</span>
          <ChevronDown />
          {getCollections()}
        </div>
      </section>
      <section className="mint-input-section">
        <span>
          Number of real piece representations <b>*</b>
        </span>
        <span className="hint secondary">
          How many real world items are associated with this NFT
        </span>
        <input 
          placeholder="1"
          type="number" 
          value={numRepresentations}
          onChange={(e: any) => updateFormData(setNumRepresentations, e.target.value)}
        ></input>
      </section>
      <section className="mint-input-section">
        <span>
          Number of collectable nfts (non representing real piece) <b>*</b>
        </span>
        <span className="hint secondary">How many NFTs should be created</span>
        <input 
          placeholder="1"
          type="number" 
          value={numCollectibles}
          onChange={(e: any) => updateFormData(setNumCollectibles, e.target.value)}
        ></input>
      </section>
      <section className="mint-input-section">
        <span>
          Creators <b>*</b>
        </span>
        <span className="hint secondary">
          How many people were involved in the creation of this piece and what
          is their revenue distribution percentage
        </span>
        {creators.map((_creator, index) => (
          <div className="creator-wrapper">
            <input
              className="creator-input"
              placeholder="Creator wallet address"
              onChange={(e: any) => updateCreators(e, index, 0)}
            ></input>
            <input
              className="revenue-input"
              type="number"
              min="0"
              max="100"
              placeholder="% Revenue distribution"
              onChange={(e: any) => updateCreators(e, index, 1)}
            ></input>
          </div>
        ))}
        <button className="new-creator-button" onClick={addNewCreator}>
          <PlusCircle /> Add new creator
        </button>
      </section>
      <section className="mint-input-section">
        <span>
          Initial ask price <b>*</b>
        </span>
        <span className="hint secondary">Initial price for the piece</span>
        <input 
          placeholder="1" 
          type="number" 
          min="0"
          value={initialAskPrice}
          onChange={(e: any) => updateFormData(setInitialAskPrice, e.target.value)}
        ></input>
      </section>
      <button className="primary-button" onClick={createItem}>
        Create Item
      </button>
    </div>
  );
}