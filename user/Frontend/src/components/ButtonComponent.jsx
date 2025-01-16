/* eslint-disable react/prop-types */
import { useState } from "react"
import "./components.css"


function ButtonComponent({ desc, onclick }) {
  const [text, setDesc] = useState(desc)

  const handleClick = () => {
    setDesc("Loading ..."); // Update the button text
    if (onclick) {
      onclick(); // Call the external onClick function if provided
    }
  };
  return (
    <div className="button-container" onClick={handleClick}>
      <button >{text}</button>
    </div>
  )
}

export default ButtonComponent