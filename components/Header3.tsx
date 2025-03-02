import React, { HTMLAttributes, ReactElement } from "react"

const Header3 = ({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>): ReactElement<any> => {
  return (
    <h3 {...rest}>
      {children}
    </h3>
  )
}

export default Header3;
