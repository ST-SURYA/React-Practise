import AccordionRoot, { AccordionRootProps } from "./Accordion";
import AccordionContent, { AccordionContentProps } from "./AccordionContents";
import AccordionHeader, { AccordionHeaderProps } from "./AccordionHeader";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";
import AccordionTrigger, { AccordionTriggerProps } from "./AccordionTrigger";

export const Accordion = {
  Root: AccordionRoot as React.FC<AccordionRootProps>,
  Item: AccordionItem as React.FC<AccordionItemProps>,
  Header: AccordionHeader as React.FC<AccordionHeaderProps>,
  Trigger: AccordionTrigger as React.FC<AccordionTriggerProps>,
  Content: AccordionContent as React.FC<AccordionContentProps>,
};
