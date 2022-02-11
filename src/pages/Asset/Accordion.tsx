import { useState } from "react";
import { ChevronDown, ChevronUp, IconProps } from "react-feather";
import "./asset.css";

export default function Accordion(props: {icon: IconProps, title: string, children: any, startOpen?: boolean}) {

  const [accordionOpen, setAccordionOpen] = useState<boolean>(props.startOpen ? props.startOpen : false);

  return(
    <div className="accordion-wrapper">
      <div 
        className="accordion-header"
        onClick={() => setAccordionOpen(!accordionOpen)}
      >
        <section>
          {props.icon}
          <span>{props.title}</span>
        </section>
        <div >
          {accordionOpen ? <ChevronUp/> : <ChevronDown/>}
        </div>
      </div>
      <div className={`accordion-content ${accordionOpen ? 'open' : ''}`}>
        {props.children}
      </div>
    </div>
  )
}
