import CardGallery from "../../components/CardGallery/CardGallery";
import { useNavigate } from 'react-router';
// import { generateSentences } from "../../components/LoremIpsum";

export default function Collections() {
  const navigate = useNavigate();

  const collectionClicked = () => {
    navigate("/collection/xyz");
  }

  return(
    <div className="page-wrapper">
      <h1>Explore Collections</h1>
      <p className="secondary">Explore all the collections that have been published to GlassFlow</p>
      <CardGallery
        cardClicked={collectionClicked}
      />
    </div>
  );
}