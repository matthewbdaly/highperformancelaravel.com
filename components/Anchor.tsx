import React, { AnchorHTMLAttributes, ReactElement } from "react"

const Anchor = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement<any> => {
  return (
    <a className="text-purple-700 underline" {...rest}>
      {children}
    </a>
  )
}

export default Anchor;
