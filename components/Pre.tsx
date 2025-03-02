import React, { HTMLAttributes, ReactElement } from "react"

const Pre = ({ children, ...rest }: HTMLAttributes<HTMLPreElement>): ReactElement<any> => {
  return (
    <pre {...rest}>
      {children}
    </pre>
  )
}

export default Pre
