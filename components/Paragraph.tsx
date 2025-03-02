import React, { HTMLAttributes, ReactElement } from "react"

const Paragraph = ({ children, ...rest }: HTMLAttributes<HTMLParagraphElement>): ReactElement<any> => {
  return (
    <p {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;
