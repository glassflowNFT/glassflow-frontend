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
          question={generateSentences(1)}
          answer={generateSentences(5)}
          startOpen={true}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
      </section>
      <section className="faq-section">
        <h2 className="faq-section-header">Marketplace</h2>
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
      </section>
      <section className="faq-section">
        <h2 className="faq-section-header">Privacy and Terms</h2>
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
        <Accordion
          question={generateSentences(1)}
          answer={generateSentences(5)}
        />
      </section>
    </div>
  );
}