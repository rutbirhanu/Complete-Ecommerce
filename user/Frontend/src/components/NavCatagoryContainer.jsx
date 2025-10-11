/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function NavCatagoryContainer({ imgSource, category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category-items/${category}`);
  };

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer" onClick={handleClick}>
      <img src={imgSource} className="h-6" alt={category} />
      <small className="font-medium text-[13px] text-[#222222] outline-none font-sans">
        {category}
      </small>
    </div>
  );
}



export default NavCatagoryContainer