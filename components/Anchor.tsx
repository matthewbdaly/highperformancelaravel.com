import React, { AnchorHTMLAttributes, ReactElement } from "react"

const Anchor = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement => {
  return (
    <a {...rest}>
      {children}
    </a>
  )
}

export default Anchor;
