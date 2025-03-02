import React, { BlockquoteHTMLAttributes, ReactElement } from "react"

const Blockquote = ({ children, ...rest }: BlockquoteHTMLAttributes<HTMLQuoteElement>): ReactElement<any> => {
  return (
    <blockquote {...rest}>
      {children}
    </blockquote>
  )
}

export default Blockquote
