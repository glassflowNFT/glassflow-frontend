import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { ChevronRight, Image, PlusCircle } from "react-feather";
import { useKeplr } from "../../components/useKeplr";
import { useBetween } from 'use-between';
import "./mint.css";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { configs } from "../../config";
import { useSnackbar } from 'notistack';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from "../../firebase-config";
import { onAuthStateChanged, User } from "@firebase/auth";
import { Modal } from "@material-ui/core";
import { SELECTED_COLLECTION } from "../../interfaces";

// placeholder for when no collection is selected
const NO_COLLECTION = {
  ownerWalletAddress: "", 
  name: "Select a Collection",
  collectionAddress: "",
  collectionDescription: ""
}

export default function Mint() {

  const [creators, setCreators] = useState<[string, number][]>([["", 100]]);
  const [selectedCollection, setSelectedCollection] = useState<SELECTED_COLLECTION>(NO_COLLECTION);
  const [userCollections, setUserCollections] = useState<any[]>();
  const [showCollectionModal, setShowCollectionModal] = useState<boolean>(false);
  const useSharedKeplr = () => useBetween(useKeplr);
  const { account, client, activateBrowserWallet } = useSharedKeplr();
  const { enqueueSnackbar } = useSnackbar();

  // form data
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [externalLink, setExternalLink] = useState<string>();
  const [numRepresentations, setNumRepresentations] = useState<number>();
  const [numCollectibles, setNumCollectibles] = useState<number>();
  const [initialAskPrice, setInitialAskPrice] = useState<number>();
  const [user, setUser] = useState<User>();

  // collection form data
  const [collectionName, setCollectionName] = useState<string>();
  const [collectionDescription, setCollectionDescription] = useState<string>();
  const [collectionsLoaded, setCollectionsLoaded] = useState<boolean>(false);

  // misc
  const [mintStep, setMintStep] = useState<number>(1);

  useEffect(() => {
    loadUserCollections();
    setSelectedCollection(NO_COLLECTION)
  // eslint-disable-next-line
  }, [account]);

  const clearInputs = () => {
    setName("");
    setDescription("");
    setExternalLink("");
    setNumRepresentations(0);
    setNumCollectibles(0);
    setInitialAskPrice(0);
    setCollectionName("");
    setCollectionDescription("");
  }

  // update user state var when loaded
  onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      setUser(user);
      // load collections if they haven't been loaded yet
      if(!collectionsLoaded) loadUserCollections();
    }
  });

  const loadUserCollections = async () => {
    if (!user) return;

    // create reference and query
    const collectionsRef = collection(db, "collections");
    const q = query(collectionsRef, where("ownerWalletAddress", "==", account))
    // execute query
    const querySnapshot = await getDocs(q);
    // array to store loaded collections
    let collections:any[] = [];
    // iterate through query response 
    querySnapshot.forEach((doc) => {
      // add to list
      if (doc.data())
        collections.push(doc.data());
    });

    // update state
    setUserCollections(collections);
    setCollectionsLoaded(true);
  }

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

  const getCollections = () => {
    const collectionSelected = (collection: SELECTED_COLLECTION) => {
      setSelectedCollection(collection);
      setMintStep(mintStep + 1);
    }

    return (
      <div className="user-collections-wrapper fade-in">
        {renderCollectionForm()}
        <div className="mint-header">
          <h1>Select a Collection</h1>
          <p className="secondary">Select a collection that your new NFT will be minted into</p>
        </div>
        <div className="user-collections-container">
          {userCollections?.map((collection: any, index: number) => (
            <div
              className="user-collection"
              onClick={() => collectionSelected(collection)}
              key={index}
            >
              {collection.name}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            activateBrowserWallet();
            setShowCollectionModal(true);
          }}
          className="primary-button"
        >
          <PlusCircle />
          Create New Collection
        </button>
      </div>
    );
  }

  // add a new creator + revenue share to the list
  const addNewCreator = () => {
    if (creators.length >= 5) return;
    let newCreators = [...creators];
    newCreators.push(["", 0]);
    setCreators(newCreators);
  }

  const validateCollectionInputs = (e: any) => {
    // prevent refresh
    e.preventDefault();
    // check if form has been validated
    let pass = e.target.checkValidity();
    // set error message
    let error = "Please fix all errors to continue"

    if (pass) {
      createCollection();
    } else {
      enqueueSnackbar(error, {
        variant: "error"
      });
    }
  }

  // validate the input fields before executing mint
  const validateItemInputs = (e: any) => {

    // prevent refresh
    e.preventDefault();

    // check if form has been validated
    let pass = e.target.checkValidity();
    let error = "Please fix all errors to continue"

    // make sure user has selected a valid collection
    if (selectedCollection.ownerWalletAddress === "") {
      pass = false;
      error = "Please select a valid collection or create a new one";
    } else {
      pass = true;
    }

    if (pass) {
      mintNFT();
    } else {
      enqueueSnackbar(error, {
        variant: "error"
      });
    }

  }

  const deployCollection = async():Promise<string> => {
    if (!client) return "";
    // Upload contract
    const gasPrice = GasPrice.fromString("0.05upebble");
    const instantiateFee = calculateFee(500_000, gasPrice);
    const codeId = 301;
    const msg:any = { 
      "name": "glassflow_nft",  
      "symbol": "GF", 
      "minter": configs.contractAddresses.AUCTION_CONTRACT,
      "collection_name": collectionName
    }
    console.log(msg);
    const { contractAddress } = await client.instantiate(
      account,
      codeId,
      msg,
      "My instance",
      instantiateFee,
      { memo: `Create a hackatom instance` },
    );
    return contractAddress;
  }

  const createCollection = async() => {
    // ask user to connect wallet before continuing
    if (!account) {
      enqueueSnackbar('Please connect your wallet to create a collection' ,{
        variant: "error"
      });
      return;
    }

    // if no client, exit 
    if (!client || !user) return;

    try {
      enqueueSnackbar('Confirm transaction in your wallet' ,{
        variant: "info"
      });

      // await updateMinters();
      // deploy the new contract and get the address
      const contractAddress = await deployCollection();

      if (contractAddress !== "") {
        // setup collection data to be stored
        const collectionData:SELECTED_COLLECTION = {
          ownerWalletAddress: account,
          name: collectionName || "",
          collectionAddress: contractAddress,
          collectionDescription: collectionDescription || ""
        }
        // update db
        await setDoc(doc(db, "collections", `${contractAddress}`), collectionData);
        // update collection drowpdown
        setSelectedCollection(collectionData);
        // reload loaded collections
        loadUserCollections();
        // close modal
        setShowCollectionModal(false);
        enqueueSnackbar('Collection creation successful' ,{
          variant: "success"
        });
        clearInputs();
      }
    } catch (e: any) {
      console.log(e);
      enqueueSnackbar('Collection creation failed' ,{
        variant: "error"
      });
    }
  }

  const mintNFT = async () => {
    // ask user to connect wallet before continuing
    if (!account) {
      enqueueSnackbar('Please connect your wallet to mint an NFT' ,{
        variant: "error"
      });
      return;
    }
    // if no client, exit 
    if (!client) return;
    const gasPrice = GasPrice.fromString("0.0025ujunox");
    const executeFee = calculateFee(300_000, gasPrice);

    // setup royalties object
    const royalties = creators.map((creator) => {
      return {
        "address": creator[0],
        "royalty_rate": (creator[1] / 1000).toString()
      }
    });

    // execute mint 
    try {
      enqueueSnackbar('Confirm transaction in your wallet' ,{
        variant: "info"
      });
      const mintData = {
        nft_addr: selectedCollection.collectionAddress,
        description: description,
        externalLink: externalLink,
        image_uri: "https://image/image.png",
        init_price: (initialAskPrice || "").toString(),
        name: name,
        num_nfts: (numCollectibles || "").toString(),
        num_real_repr: (numRepresentations || "").toString(),
        royalties: royalties
      }
      console.log(mintData);
      const result = await client.execute(
        account,
        configs.contractAddresses.AUCTION_CONTRACT,
        {
          mint: mintData
        }, 
        executeFee,
        "",
        []
      );
      console.log(result);
      enqueueSnackbar('NFT creation successful' ,{
        variant: "success"
      });
    } catch (e) {
      console.log(e);
      enqueueSnackbar('NFT creation failed' ,{
        variant: "error"
      });
    }

  }

  const renderCollectionForm = () => {
    if (showCollectionModal)
    return (
      <Modal
        open={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        className="modal"
      >
        <div className="new-collection-wrapper fadeIn">
          <form 
            onSubmit={validateCollectionInputs}
          >
          <div className="mint-header">
            <h1>Create New Collection</h1>
            <span className="secondary">
              <b>*</b> Required Fields
            </span>
          </div>
            <section className="auth-field-section mint-input-section">
              <span>
                Collection Logo Image <b>*</b>
              </span>
              <div className="file-selector-wrapper">
                <input
                  className="file-selector"
                  type="file"
                  required
                  accept=".jpg, .jpeg, .png"
                ></input>
                <Image />
              </div>
              <span className="secondary hint">
                File types supported: JPG, JPEG, PNG
              </span>
            </section>
            <section className="auth-field-section mint-input-section">
              <span>
                Collection Banner Image <b>*</b>
              </span>
              <div className="file-selector-wrapper">
                <input
                  className="file-selector"
                  type="file"
                  required
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
                Collection Name <b>*</b>
              </span>
              <span className="hint secondary">
                Newly created NFTs will appear under this name
              </span>
              <input
                placeholder="Collection name"
                value={collectionName}
                required
                onChange={(e: any) =>
                  updateFormData(setCollectionName, e.target.value)
                }
              ></input>
            </section>
            <section className="mint-input-section">
              <span>Collection Description <b>*</b></span>
              <span className="hint secondary">
                The description will be included on the collection's page, and
                will be displayed on asset pages that belong to the collection
              </span>
              <textarea
                placeholder="Detailed description of your collection"
                required
                value={collectionDescription}
                onChange={(e: any) =>
                  updateFormData(setCollectionDescription, e.target.value)
                }
              ></textarea>
            </section>
            <button
              className="create-collection primary-button"
            >
              Create New Collection
            </button>
          </form>
        </div>
      </Modal>
    );
  };

  const renderNFTForm = () => {
    return(
      <Fragment>
        <div className="mint-header">
          <h1>Mint New Item</h1>
          <span className="secondary">
            <b>*</b> Required Fields
          </span>
        </div>
        <form onSubmit={validateItemInputs}>
          <section className="auth-field-section">
            <span>Image or Video <b>*</b></span>
            <div className="file-selector-wrapper">
              <input
                className="file-selector"
                required
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
              required
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
            <span>Description <b>*</b></span>
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
            <span>Collection <b>*</b></span>
            <span className="hint secondary">
              This is the collection your item will be grouped with
            </span>
            <div
              className="collection-dropdown secondary"
              onClick={() => setMintStep(mintStep - 1)}
            >
              <span>{selectedCollection.name}</span>
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
              required
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
              required
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
            <button className="new-creator-button" type="button" onClick={addNewCreator}>
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
              required
              min="0"
              value={initialAskPrice}
              onChange={(e: any) => updateFormData(setInitialAskPrice, e.target.value)}
            ></input>
          </section>
          <button className="primary-button">
            Create Item
          </button>
        </form>
      </Fragment>
    )
  }

  const renderSteps = () => {
    let render;
    switch(mintStep) {
      case 1:
        render = getCollections();
        break;
      case 2:
        render = renderNFTForm();
        break;
    }

    const steps = [
      "Choose Collection",
      "Mint NFT"
    ];

    const updateStep = (value: number) => {
      if (selectedCollection.ownerWalletAddress!== "")
        setMintStep(value);
    }

    return (
      <Fragment>
        <div className="mint-steps">
          {steps.map((step: string, index: number) => 
            <div className="mint-step">
              <span 
                className={`${index + 1 === mintStep ? 'active' : ''}`}
                onClick={() => updateStep(index + 1)}
              >
                {step}
              </span>
              {index !== steps.length - 1 && <ChevronRight/>}
            </div>
          )}
        </div>
        {render}
      </Fragment>
    );
  }

  return (
    <div className="mint-wrapper page-wrapper">
      {renderSteps()}
    </div>
  );
}