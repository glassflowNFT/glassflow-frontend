import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "./support.css";

export default function Accordion(props: {question: string, answer: any, startOpen?: boolean}) {

  const [accordionOpen, setAccordionOpen] = useState<boolean>(props.startOpen ? props.startOpen : false);

  return(
    <div className="accordion-wrapper">
      <div 
        className="accordion-header"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <section>
          <span>{props.question}</span>
        </section>
        {accordionOpen ? <ChevronUp/> : <ChevronDown/>}
      </div>
      <div className={`secondary accordion-content ${accordionOpen ? 'open' : ''}`}>
        {props.answer}
      </div>
    </div>
  )
}
