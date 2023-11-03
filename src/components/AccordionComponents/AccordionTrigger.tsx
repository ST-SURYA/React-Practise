import React, { forwardRef, ReactNode, HTMLProps } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export interface AccordionTriggerProps extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit";
  className?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Trigger
      className={`accordion-trigger ${className}`}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <span className="accordion-icon" aria-hidden="true"></span>
    </Accordion.Trigger>
  )
);

export default AccordionTrigger;
