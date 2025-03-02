import React, { HTMLProps, ReactElement } from "react"

const CodeBlock = ({ children, ...rest }: HTMLProps<HTMLElement>): ReactElement<any> => {
  return (
    <code {...rest}>
      {children}
    </code>
  );
}

export default CodeBlock;
