import './home.css';
import { ChevronRight } from 'react-feather';

export default function Home() {


  return (
    <div className="home-wrapper page-wrapper">
      <section className="hero-section page-section">
        <section className="call-to-action">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliq.
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
        <section className="collections-header">
          <h1>Featured Collections</h1>
          <p className="secondary">
            Nisi vitae suscipit tellus mauris a diam. Eget nunc lobortis mattis
            aliquam faucibus purus in massa. Nec ullamcorper sit amet risus
            nullam eget. Id diam maecenas ultricies mi eget. Id diam maecenas
            ultricies mi eget mauris pharetra et ultrices. Sit amet luctus
            venenatis lectus. Suspendisse faucibus interdum posuere lorem ipsum
            dolor sit amet consectetur.
          </p>
          <button className="primary-button">
            View All Collections <ChevronRight />
          </button>
          <section className="collections-wrapper">
            <div className="collection">
              <img src="https://lotgrafix.com/wp-content/uploads/2019/04/34-asana-color-gradient.jpg" alt="collection"></img>
              <div className="collection-info">
                <span className="collection-name">Nisi vitae suscipit</span>
                <p className="collection-description secondary">Eget nunc lobortis mattis aliquam faucibus purus in massa.</p>
                <span className="collection-link">See Collection <ChevronRight/></span>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}