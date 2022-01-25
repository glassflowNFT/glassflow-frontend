import './home.css';
import { ChevronRight } from 'react-feather';
import { generateSentences, generateWords } from '../../components/LoremIpsum';
import gradient from 'random-gradient';



export default function Home() {

  const renderCollection = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    return(
      <div className="collection" key={count}>
        <img src="https://lotgrafix.com/wp-content/uploads/2019/04/34-asana-color-gradient.jpg" alt="collection"></img>
        <div className="collection-info">
          <span className="collection-name">{generateSentences(1)}</span>
          <p className="collection-description secondary">{generateSentences(1)}</p>
          <span className="collection-link">See Collection <ChevronRight/></span>
        </div>
      </div>
    );
  }

  const renderTrendingArtists = () => {
    const count = Math.round(Math.random() * (500 - 0) + 0);
    const bgGradient = { background: gradient(count.toString()) };
    return (
      <div className="artist" key={count}>
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

  return (
    <div className="home-wrapper page-wrapper">
      <section className="hero-section page-section">
        <section className="call-to-action">
          <p>
            {generateSentences(2)}
          </p>
          <button className="primary-button">
            Get Started <ChevronRight />
          </button>
        </section>
        <section className="hero-image">
          <img
            src="https://www.pixelstalk.net/wp-content/uploads/2016/05/Gradient-Wallpaper.jpg"
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
          <button className="primary-button">
            View All Collections <ChevronRight />
          </button>
        </section>
        <section className="collections-wrapper">
          {[...Array(9)].map(renderCollection)}
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
        <section className="artists-wrapper">
          {[...Array(10)].map(renderTrendingArtists)}
        </section>
      </section>
    </div>
  );
}