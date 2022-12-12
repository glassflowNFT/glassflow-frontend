import './home.css';
import { ChevronRight } from 'react-feather';
import { generateSentences, generateWords } from '../../components/LoremIpsum';
import gradient from 'random-gradient';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const renderCollection = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    return(
      <div className="collection-preview" key={count}>
        <img src="https://lotgrafix.com/wp-content/uploads/2019/04/34-asana-color-gradient.jpg" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">{generateSentences(1)}</span>
          <p className="collection-description secondary">{generateSentences(1)}</p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>
      
      
    );
  }

  const renderTrendingArtists = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    const bgGradient = { background: gradient(count.toString()) };
    return (
      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/xyz")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">{generateWords(2)}</span>
          <span className="artist-bio secondary">{generateSentences(1)}</span>
        </div>
      </div>
    )
  }
      const count = Math.round(Math.random() * (500 - 0) + 0);
    const bgGradient = { background: gradient(count.toString()) };

  return (
    <div className="home-wrapper page-wrapper">
      <section className="hero-section page-section">
        <section className="call-to-action">
          <p>
          <section className="collections-section page-section">
          <section className="home-section-header">
            <h1>NFT Minting & Cannabis Community Integration</h1>
              </section>
            </section>
          </p>
          <Link to={"genesis"}>
            <button className="primary-button">
                Genesis Launch<ChevronRight />
            </button>
          </Link>
        </section>
        <section className="hero-image">
          <img
            src="https://nftstorage.link/ipfs/bafkreicxggz3p4m5piyk5kgi5kv7eo77inojinyzbe2aeqka6uxqd4vqvy"
            alt="hero"
          ></img>
        </section>
      </section>
      <section className="collections-section page-section">
        <section className="home-section-header">
          <h1>Featured Collections</h1>
          <p className="secondary">
            {generateSentences(10)} 
          </p>
          <button className="primary-button" onClick={() => navigate("/collections")}>
            View All Collections <ChevronRight />
          </button>
        </section>
        <section className="collections-wrapper">
        <div className="collection-preview" key={count}>
        <img src="https://nftstorage.link/ipfs/bafybeigyltl2mqxvenvuxt6ypchmb3s5o4wcq3w7c2kexxbr4b4tzbcghe" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">Legends Of Hashish NFT Tickets</span>
          <p className="collection-description secondary">Offical Collections of Legends Event Access NFT's</p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>

      <div className="collection-preview" key={count}>
        <img src="https://nftstorage.link/ipfs/bafkreicxggz3p4m5piyk5kgi5kv7eo77inojinyzbe2aeqka6uxqd4vqvy" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">Mothership x Legends Attendee Airdrop Collection</span>
          <p className="collection-description secondary">{generateSentences(1)}</p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>

      <div className="collection-preview" key={count}>
        <img src="https://lotgrafix.com/wp-content/uploads/2019/04/34-asana-color-gradient.jpg" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">Henley Beall's Cannabis Cards</span>
          <p className="collection-description secondary">Cannabis & Psychedelic Creator Henley Bealle's Official Playing Card Collection  </p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>

      <div className="collection-preview" key={count}>
        <img src="https://nftstorage.link/ipfs/bafybeieaw2k42vv7tbgh6zjlhmrhpcmnwb2yeh4zda2as7zxbk7lm6zicu" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">Glassflow: The Reveal </span>
          <p className="collection-description secondary">The first collection of the Glassflow Minting Hub Community</p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>

      <div className="collection-preview" key={count}>
        <img src="https://nftstorage.link/ipfs/bafybeieknarg4q74owyzhtahj44a3s3rkmygo4bkikr3wr36ijlvkupptq" alt="collection"></img>
        <div className="collection-preview-info">
          <span className="collection-name">Terp-DAO </span>
          <p className="collection-description secondary">NFT Collection of TerpDAO</p>
          <span 
            className="collection-link"
            onClick={() => navigate("/collection/xyz")}
          >
            See Collection <ChevronRight/>
          </span>
        </div>
      </div>
        </section>
      </section>
      <section className="collections-section page-section">
        <section className="home-section-header">
          <h1>Trending Artists</h1>
          <p className="secondary">
            {generateSentences(10)} 
          </p>
          <button className="primary-button">
            View All Artists <ChevronRight />
          </button>
        </section>
        <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/xyz")}
      >
      </div>
        <section className="artists-wrapper">
        <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/henley")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">Henley Bealle</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>
      
      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/mothership")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">Mothership Glass</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>
      
      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/shurlok")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">Shurlok Holms</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>

      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/n8")}
      >
      <div className="image-wrapper" style={bgGradient}>
        </div>
        <div className="artist-info">
          <span className="artist-name">Nathan Miers</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>

      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/divine_visions")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">Divine Visions</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>

      <div 
        className="artist" 
        key={count}
        onClick={() => navigate("/user/kidder_wibbit")}
      >
        <div className="image-wrapper" style={bgGradient}>
          {/*<img src={`https://picsum.photos/200/${count}`} alt="artist"></img>*/}
        </div>
        <div className="artist-info">
          <span className="artist-name">Kidder Wibbet</span>
          <span className="artist-bio secondary"></span>
        </div>
      </div>

        </section>
      </section>
      
    </div>
  );
}