import React from "react";
import { useAccordion, useAccordionItem } from "@react-aria/accordion";

function AccordionExample() {
  const { state, accordionProps } = useAccordion();

  return (
    <div {...accordionProps}>
      {state.items.map((item) => (
        <AccordionItem key={item.key} item={item} />
      ))}
    </div>
  );
}

function AccordionItem({ item }) {
  const ref = React.useRef();
  const { buttonProps, isExpanded } = useAccordionItem({ item });

  return (
    <div>
      <button {...buttonProps} ref={ref}>
        {item.key}
      </button>
      {isExpanded && (
        <div>
          {/* Content for the expanded item */}
          <p>This is the content of {item.key}.</p>
        </div>
      )}
    </div>
  );
}

export default AccordionExample;
