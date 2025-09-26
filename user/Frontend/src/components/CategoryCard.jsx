/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"


function CategoryCard({ desc, category, imgSource }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category-items/${category}`);
  };

  return (
    <div
      className="relative m-2 rounded-[4px] cursor-pointer"
      onClick={handleClick}
    >
      {/* Overlay */}
      <div className="absolute top-[17px] left-[15px] transition-all duration-400 ease-in-out hover:top-[2px] hover:left-[2px] hover:h-[99%] hover:w-[99%] hover:bg-white/40 flex flex-col justify-start p-2">
        <p className="font-sans font-normal">{desc}</p>
        <h5 className="font-sans font-bold text-[1.4rem]">{category}</h5>
      </div>

      <img
        src={imgSource}
        alt={category}
        className="h-[310px] w-[290px] rounded-[4px] object-cover"
      />
    </div>
  );
}


export default CategoryCard