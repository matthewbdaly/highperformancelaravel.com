import React, { HTMLAttributes, ReactElement } from "react"

const Header1 = ({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>): ReactElement<any> => {
  return (
    <h1 {...rest}>
      {children}
    </h1>
  )
}

export default Header1;
