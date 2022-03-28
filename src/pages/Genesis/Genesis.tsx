import { generateSentences, generateWords } from "../../components/LoremIpsum";
import gradient from 'random-gradient';
import { uid } from "uid";
import "./genesis.css";

export default function Genesis() {

  const getLaunches = () => {
    return(
      [...new Array(5)].map((val, index: number) => {
        const id = uid();
        const bgGradient = { background: gradient(id.toString()) };
        return(
          <div key={index} className="launch-wrapper">
            <section className="launch-wrapper-left">
              <span className="launch-name">
                {generateWords(3)}  
              </span> 
              <p className="launch-description secondary">
                {generateSentences(3)}
              </p>
              <span className="launch-creator secondary">Created By: <b>wasm14f3....wet2fg</b></span>
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