import React, { ReactNode } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import "./Accordion.scss";

export interface AccordionRootProps {
  children: ReactNode;
  className?: string;
  type?: "single" | "multiple"; 
}

const AccordionRoot: React.FC<AccordionRootProps> = ({
  children,
  className,
  type="single",
  ...props
}) => {
  return (
    <RadixAccordion.Root
      className={`accordion ${className}`}
      type={type}
      collapsible
      {...props}
    >
      {children}
    </RadixAccordion.Root>
  );
};

export default AccordionRoot;
