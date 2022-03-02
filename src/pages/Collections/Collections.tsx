import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
import { useBetween } from "use-between";
import { useKeplr } from "../../components/useKeplr";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
// import { generateSentences } from "../../components/LoremIpsum";

export default function Collections() {
  const navigate = useNavigate();
  const useSharedKeplr = () => useBetween(useKeplr);
  const { client, readOnlyClient } = useSharedKeplr();
  const [items, setItems] = useState<any[]>([]);

  const collectionClicked = (item: any) => {
    navigate(`/collection/${item.collectionAddress}`);
  }

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line
  }, [client, readOnlyClient]);

  const fetchItems = async () => {
    let collections:any[] = [];

    // get all collections
    const collectionsRef = collection(db, "collections");
    const q = query(collectionsRef, where("collectionAddress", "!=", ""))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // add to list
      if (doc.data())
        collections.push(doc.data());
    });

    // update state var
    setItems(collections);
  }

  return(
    <div className="page-wrapper">
      <h1>Explore Collections</h1>
      <p className="secondary">Explore all the collections that have been published to GlassFlow</p>
      <CardGallery
        cardClicked={collectionClicked}
        items={items}
      />
    </div>
  );
}