import React, { HTMLAttributes, ReactElement } from "react"

const ListItem = ({ children, ...rest }: HTMLAttributes<HTMLLIElement>): ReactElement => {
  return (
    <li {...rest}>
      {children}
    </li>
  )
}

export default ListItem;
