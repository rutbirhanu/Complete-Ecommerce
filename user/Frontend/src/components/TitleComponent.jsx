/* eslint-disable react/prop-types */

import "./components.css"

function TitleComponent({title}) {
  return (
      <div className="title-component">
          <p>{title}</p>
    </div>
  )
}

export default TitleComponent