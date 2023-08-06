import React, { HTMLAttributes, ReactElement } from "react"

const Pre = ({ children, ...rest }: HTMLAttributes<HTMLPreElement>): ReactElement => {
  return (
    <pre {...rest}>
      {children}
    </pre>
  )
}

export default Pre
