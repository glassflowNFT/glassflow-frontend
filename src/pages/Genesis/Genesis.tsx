import { generateSentences, generateWords } from "../../components/LoremIpsum";
import gradient from 'random-gradient';
import { uid } from "uid";
import "./genesis.css";
import { LinearProgress } from "@material-ui/core";

export default function Genesis() {

  const getLaunches = () => {
    return(
      [...new Array(5)].map((val, index: number) => {
        const id = uid();
        const bgGradient = { background: gradient(id.toString()) };
        const percent = Math.floor(Math.random() * 100);
        return(
          <div key={index} className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
                {generateWords(3)}  
              </span> 
              <p className="launch-description secondary">
                {generateSentences(3)}
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
        )
      })
    );
  }

  return (
    <div className="genesis-wrapper page-wrapper">
      {getLaunches()}
    </div>
  );
}