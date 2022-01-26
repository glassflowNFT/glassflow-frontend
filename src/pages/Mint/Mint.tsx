import React, { useState } from "react";
import { ChevronDown, Image, PlusCircle } from "react-feather";
import "./mint.css";

export default function Mint() {

  const [creators, setCreators] = useState<[string, number][]>([["", 100]]);

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

  // add a new creator + revenue share to the list
  const addNewCreator = () => {
    let newCreators = [...creators];
    newCreators.push(["", 0]);
    setCreators(newCreators);
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
        <input placeholder="Item name"></input>
      </section>
      <section className="mint-input-section">
        <span>External Link</span>
        <span className="hint secondary">
          This link will be displayed on the item’s detail page so that users
          can learn more about your item. You are free to put any link to any
          page or content that you see fit.
        </span>
        <input placeholder="https://link.com/path/to/data" type="url"></input>
      </section>
      <section className="mint-input-section">
        <span>Description</span>
        <span className="hint secondary">
          The description will be included on the item's detail page underneath
          its image
        </span>
        <textarea placeholder="Detailed description of your item"></textarea>
      </section>
      <section className="mint-input-section">
        <span>Collection</span>
        <span className="hint secondary">
          This is the collection your item will be grouped with
        </span>
        <div className="collection-dropdown">
          <span>Select Collection</span>
          <ChevronDown />
        </div>
      </section>
      <section className="mint-input-section">
        <span>
          Number of real piece representations <b>*</b>
        </span>
        <span className="hint secondary">
          How many real world items are associated with this NFT
        </span>
        <input placeholder="1"></input>
      </section>
      <section className="mint-input-section">
        <span>
          Number of collectable nfts (non representing real piece) <b>*</b>
        </span>
        <span className="hint secondary">How many NFTs should be created</span>
        <input placeholder="1"></input>
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
        <input placeholder="1" type="number" min="0"></input>
      </section>

      <button className="primary-button">Create Item</button>
    </div>
  );
}