import React, { AnchorHTMLAttributes, ReactElement } from "react"

const Anchor = ({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement => {
  return (
    <a className="text-purple-700 dark:text-purple-200 underline" {...rest}>
      {children}
    </a>
  )
}

export default Anchor;
