import { generateSentences } from "../../components/LoremIpsum";
import Accordion from "./Accordion";

export default function Support() {
  return(
    <div className="support-wrapper page-wrapper">
      <h1>Support</h1>
      <p className="secondary">{generateSentences(6)}</p>
      <section className="faq-section">
        <h2 className="faq-section-header">General</h2>
        <Accordion
          question={"What is Glassflow?"}
          answer={generateSentences(5)}
          startOpen={true}
        />
        <Accordion
          question={"What is Chronic Chain?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"What is the Cosmos Ecosystem"}
          answer={generateSentences(5)}
        />
      </section>
      <section className="faq-section">
        <h2 className="faq-section-header">Interaction Support</h2>
        <Accordion
          question={"What is needed to connect to Glassflow"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"How do I create a profile?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"I am an artist. How do I mint a collection?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"I am a collector, how do I mint my favorite artist NFT?"}
          answer={generateSentences(5)}
        />
      </section>
      <section className="faq-section">
        <h2 className="faq-section-header">Security Support</h2>
        <Accordion
          question={"How is Glassflow secure?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"How are my funds safe?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"How will I ensure what I am collecting is authentic?"}
          answer={generateSentences(5)}
        />
      </section>
      <section className="faq-section">
        <h2 className="faq-section-header">GFLO Minting-hub DAO Token Support</h2>
        <Accordion
          question={"What is GFLO?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"What is GFLO used for?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"What are the tokenomics for GFLO?"}
          answer={generateSentences(5)}
        />
        <Accordion
          question={"How can I acquire GFLO?"}
          answer={generateSentences(5)}
        />
      </section>
    </div>
  );
}