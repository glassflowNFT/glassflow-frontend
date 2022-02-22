import { generateWords } from "../../components/LoremIpsum";
import gradient from 'random-gradient';
import "./cardGallery.css";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Search } from "react-feather";
import { NFT_PREVIEW_DATA } from "../../interfaces";

export default function CardGallery (props: {cardClicked: (e: any) => void, items?: NFT_PREVIEW_DATA[]}) {

  // const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(true);

  const renderCards = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    const bgGradient = { background: gradient(count.toString()) };
    // const words = generateWords(2);
    // render fake data for now if no items are passed in
    if (!props.items) {
      return [...Array(5)].map(() =>
        <div 
          className="content" 
          key={count}
          onClick={props.cardClicked}
        >
          <div className="image-wrapper" style={bgGradient}>
            {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
          </div>
          <div className="content-info">
            <span className="content-name">{generateWords(2)}</span>
            {/*<span className="content-bio secondary">{generateSentences(1)}</span>*/}
          </div>
        </div>
      )
    } else {
      return props.items.map((item, index) => 
        <div
          className="content"
          key={index}
          onClick={() => props.cardClicked(item)}
        >
          <div className="image-wrapper" style={bgGradient}>
            {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
          </div>
          <div className="content-info">
            <span className="content-collection">{item.collection}</span>
            <span className="content-name secondary">{item.name}</span>
          </div>
        </div>
      );
    }
  // eslint-disable-next-line
  };

  return (
    <section className="content-container">
      <div className="search-wrapper">
        <Search/>
        <input placeholder="Search for items" onChange={(e: any) => setSearchValue(e.target.value)}></input>
      </div>
      <div className="content-bottom">
      <div className={`side-filter-wrapper ${showFilter ? '' : 'close'}`}>
        <div className="side-filter-header">
          <span>
            <Filter/>
            Filter
          </span>
          <div onClick={() => setShowFilter(!showFilter)}>
            {showFilter ? <ChevronLeft/> : <ChevronRight/>}
          </div>
        </div>
        <div className="side-filter-item">
          <span className="side-filter-item-header">
            Status 
            <ChevronDown/>
          </span>
        </div>
        <div className="side-filter-item">
          <span className="side-filter-item-header">
            Price 
            <ChevronDown/>
          </span>
        </div>
        <div className="side-filter-item">
          <span className="side-filter-item-header">
            Category 
            <ChevronDown/>
          </span>
        </div>
      </div>
      <section className="content-wrapper">
        {renderCards()}
      </section>
      </div>
    </section>
  );
}