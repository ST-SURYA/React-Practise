import React, { forwardRef, HTMLProps, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export interface AccordionContentProps extends HTMLProps<HTMLDivElement>{
  children?: ReactNode;
  className?:string
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={`accordion-panel ${className}`}
      {...props}
      ref={forwardedRef}
    >
      <div>{children}</div>
    </Accordion.Content>
  )
);

export default AccordionContent;
