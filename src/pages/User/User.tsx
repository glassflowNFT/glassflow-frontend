import { generateSentences, generateWords } from "../../components/LoremIpsum";
import gradient from 'random-gradient';
import "./user.css";
import { useState } from "react";
import { Search } from "react-feather";

const count = Math.round(Math.random() * (500 - 0) + 0);
const bgGradient = { background: gradient(count.toString()) };
const words = generateWords(2);
const sentence = generateSentences(5);

export default function User() {

  const [selectedFilter, setSelectedFilter] = useState<string>("owned");
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState<string>("");

  const setFilter = (e: any) => {
    setSelectedFilter(e.target.innerHTML.toLowerCase());
  }

  const renderTrendingArtists = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    const bgGradient = { background: gradient(count.toString()) };
    // const words = generateWords(2);
    return (
      <div className="content" key={count}>
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="content-info">
          <span className="content-name">{generateWords(2)}</span>
          {/*<span className="content-bio secondary">{generateSentences(1)}</span>*/}
        </div>
      </div>
    )
  }

  return (
    <div className="user-wrapper page-wrapper">
      <section className="user-info-wrapper">
        <div className="profile-wrapper" style={bgGradient}></div>
        <section className="user-info">
          <div>
            <span className="user-name">{words}</span>
            <span className="user-address secondary">
              (0xeD470d85A7FD0f2b558A7bbFADb2338A7c03F51A)
            </span>
          </div>
          <p className="user-bio secondary">{sentence}</p>
        </section>
      </section>
      <section className="content-filter-wrapper">
        <button
          className={`content-filter ${
            selectedFilter === "owned" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Owned
        </button>
        <button
          className={`content-filter ${
            selectedFilter === "created" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Created
        </button>
        <button
          className={`content-filter ${
            selectedFilter === "listed" ? "active" : ""
          }`}
          onClick={setFilter}
        >
          Listed
        </button>
      </section>
      <section className="user-content">
        <div className="search-wrapper">
          <Search/>
          <input placeholder="Search for items" onChange={(e: any) => setSearchValue(e.target.value)}></input>
        </div>
        <section className="content-wrapper">
        {[...Array(Math.round(Math.random() * (20 - 1) + 1))].map(renderTrendingArtists)}
        </section>
      </section>
    </div>
  );
}