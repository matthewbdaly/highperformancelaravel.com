import React, { HTMLProps, ReactElement } from "react"

const Info = ({ children }: HTMLProps<HTMLElement>): ReactElement<any> => {
  return (
    <div className="info">
      <i className="icon-lightbulb-o" title="Worth knowing"></i>
      <section>
        {children}
      </section>
    </div>
  )
}

export default Info;
