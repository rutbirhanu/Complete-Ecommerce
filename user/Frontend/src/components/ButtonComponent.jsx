/* eslint-disable react/prop-types */
import { useState } from "react"

function ButtonComponent({ desc, onclick, showLoading = false }) {
  const [text, setText] = useState(desc);

  const handleClick = () => {
    if (showLoading) {
      setText("Loading ...");
    }
    if (onclick) {
      onclick();
    }
  };

  return (
    <div
      className="bg-[#4e72d5] h-[2.5rem] rounded-[5px] flex justify-center items-center m-[2em_10px] shadow-[13px_13px_20px_#cbced1,-13px_-13px_20px_#fff] hover:cursor-pointer"
      onClick={handleClick}
    >
      <button className="border-none outline-none bg-transparent text-white text-[18px] font-medium">
        {text}
      </button>
    </div>
  );
}

export default ButtonComponent;
