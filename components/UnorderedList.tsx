import React, { HTMLAttributes, ReactElement } from "react"

const UnorderedList = ({ children, ...rest }: HTMLAttributes<HTMLUListElement>): ReactElement => {
  return (
    <ul {...rest}>
      {children}
    </ul>
  )
}

export default UnorderedList;
