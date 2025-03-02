import React, { HTMLAttributes, ReactElement } from "react"

const Header2 = ({ children, ...rest }: HTMLAttributes<HTMLHeadingElement>): ReactElement<any> => {
  return (
    <h2 {...rest}>
      {children}
    </h2>
  )
}

export default Header2;
