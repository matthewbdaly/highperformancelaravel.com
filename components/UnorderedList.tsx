import React, { HTMLAttributes, ReactElement } from "react"

const UnorderedList = ({ children, ...rest }: HTMLAttributes<HTMLUListElement>): ReactElement => {
  return (
    <ul className="pl-4 list-disc" {...rest}>
      {children}
    </ul>
  )
}

export default UnorderedList;
