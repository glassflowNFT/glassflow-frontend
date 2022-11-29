import { generateSentences, generateWords } from "../../components/LoremIpsum";
import gradient from 'random-gradient';
import { uid } from "uid";
import "./genesis.css";
import { LinearProgress } from "@material-ui/core";

export default function Genesis() {

  const getLaunches = () => {
    return(
      [...new Array(1)].map((val, index: number) => {
        const id = uid();
        const bgGradient = { background: gradient(id.toString()) };
        const percent = Math.floor(Math.random() * 100);
        // Henley Mint
        return(
          <div key={index} className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
              Henley Bealle: Trading Card NFT Collection
              </span> 
              <p className="launch-description secondary">
              Henley Bealle description
              </p>
              <div className="launch-stats">
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Created By:</span>
                  <span className="launch-stat">wasm1baa6....cb4a</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Number of NFTs:</span>
                  <span className="launch-stat">52</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Mint Price:</span>
                  <span className="launch-stat">420 TERP</span>
                </div>
                <div className="launch-stat-wrapper no-margin">
                  <span className="launch-stat">Percent Minted:</span>
                  <span className="launch-stat">{percent}%</span>
                </div>
                <LinearProgress variant="determinate" value={percent} />
              </div>
              <button className="primary-button">Mint</button>
            </section>
            <section className="launch-wrapper-right">
              <div className="image-wrapper" style={bgGradient}></div>
            </section>
          </div>
        )
      })
    );
  }
  const id = uid();
  const bgGradient = { background: gradient(id.toString()) };
  const percent = Math.floor(Math.random() * 100);
  return (
    <div className="genesis-wrapper page-wrapper">
      {getLaunches()}
      <div  className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
               Shurlok Holms: Collection
              </span> 
              <p className="launch-description secondary">
             
              </p>
              <div className="launch-stats">
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Created By:</span>
                  <span className="launch-stat">wasm1baa6....cb4a</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Number of NFTs:</span>
                  <span className="launch-stat">415</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Mint Price:</span>
                  <span className="launch-stat">13.3 CHT</span>
                </div>
                <div className="launch-stat-wrapper no-margin">
                  <span className="launch-stat">Percent Minted:</span>
                  <span className="launch-stat">{percent}%</span>
                </div>
                <LinearProgress variant="determinate" value={percent} />
              </div>
              <button className="primary-button">Mint</button>
            </section>
            <section className="launch-wrapper-right">
              <div className="image-wrapper" style={bgGradient}></div>
            </section>
          </div>

          <div  className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
                TerpDAO Genesis Collection
              </span> 
              <p className="launch-description secondary">
                Official TerpDAO Membership Collection
              </p>
              <div className="launch-stats">
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Created By:</span>
                  <span className="launch-stat">wasm1baa6....cb4a</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Number of NFTs:</span>
                  <span className="launch-stat">415</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Mint Price:</span>
                  <span className="launch-stat">13.3 CHT</span>
                </div>
                <div className="launch-stat-wrapper no-margin">
                  <span className="launch-stat">Percent Minted:</span>
                  <span className="launch-stat">{percent}%</span>
                </div>
                <LinearProgress variant="determinate" value={percent} />
              </div>
              <button className="primary-button">Mint</button>
            </section>
            <section className="launch-wrapper-right">
              <div className="image-wrapper" style={bgGradient}></div>
            </section>
          </div>

          <div  className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
              Official kidderwibbit collection
              </span> 
              <p className="launch-description secondary">
                
              </p>
              <div className="launch-stats">
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Created By:</span>
                  <span className="launch-stat">wasm1baa6....cb4a</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Number of NFTs:</span>
                  <span className="launch-stat">415</span>
                </div>
                <div className="launch-stat-wrapper">
                  <span className="launch-stat">Mint Price:</span>
                  <span className="launch-stat">13.3 CHT</span>
                </div>
                <div className="launch-stat-wrapper no-margin">
                  <span className="launch-stat">Percent Minted:</span>
                  <span className="launch-stat">{percent}%</span>
                </div>
                <LinearProgress variant="determinate" value={percent} />
              </div>
              <button className="primary-button">Mint</button>
            </section>
            <section className="launch-wrapper-right">
              <div className="image-wrapper" style={bgGradient}></div>
            </section>
          </div>
    </div>
  );
}