import React, { ReactNode } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";

export interface AccordionItemProps {
  children: ReactNode;
  value: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children, ...props }) => (
  <RadixAccordion.Item {...props}>{children}</RadixAccordion.Item>
);

export default AccordionItem;
