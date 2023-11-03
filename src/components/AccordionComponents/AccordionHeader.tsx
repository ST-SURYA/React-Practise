import React, { HTMLProps, ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";

export interface AccordionHeaderProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  className?:string
}
const AccordionHeader = React.forwardRef<HTMLDivElement , AccordionHeaderProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header>{children}</Accordion.Header>
  )
);

export default AccordionHeader;
