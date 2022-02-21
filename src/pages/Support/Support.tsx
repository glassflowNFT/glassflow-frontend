import { generateSentences } from "../../components/LoremIpsum";

export default function Support() {
  return(
    <div className="support-wrapper page-wrapper">
      <h1>Support</h1>
      <p>{generateSentences(4)}</p>
    </div>
  );
}