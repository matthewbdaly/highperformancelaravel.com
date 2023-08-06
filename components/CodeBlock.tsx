import React, { HTMLProps, ReactElement } from "react"

const CodeBlock = ({ children, ...rest }: HTMLProps<HTMLElement>): ReactElement => {
  return (
    <code {...rest}>
      {children}
    </code>
  );
}

export default CodeBlock;
