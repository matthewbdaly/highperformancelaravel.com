import React, { AnchorHTMLAttributes, ReactElement } from "react"

const Anchor = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement => {
  return (
    <a className="text-caribbean-green-700 dark:text-caribbean-green-200 underline" {...rest}>
      {children}
    </a>
  )
}

export default Anchor;
