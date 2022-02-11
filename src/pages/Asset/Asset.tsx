import { AlignLeft, Clock, Info, Star, Tag } from 'react-feather';
import { generateSentences, generateWords } from '../../components/LoremIpsum';
import gradient from 'random-gradient';
import Accordion from './Accordion';
import { useNavigate } from 'react-router';
import './asset.css';

export default function Asset() {

  const count = Math.round(Math.random() * (500 - 0) + 0);
  const bgGradient = { background: gradient(count.toString()) };
  const navigate = useNavigate();

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
              onClick={() => navigate("/collection/xyz")}
            >
              {generateWords(2)}
            </span>
            <span 
              className="asset-info-text"
            >
              {generateWords(2)}
            </span>
          </div> 
          <div className="asset-info-right">
            <span 
              className="asset-info-title">Owner</span>
            <span 
              className="asset-info-text asset-owner-link"
              onClick={() => navigate("/user/xyz")}
            >
              wasm1291....4141
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
            <button className="primary-button">Make Offer</button>
          </div>
        </Accordion>
        <Accordion
          icon={<Tag/>}
          title="Asset Description"
          startOpen={true}
        >
          <span className="secondary">
            {generateSentences(4)}
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
            {generateSentences(4)}
          </span>
        </Accordion>
      </section>
    </div>
  );
}