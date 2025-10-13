import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function CategoryCard({ desc, category, imgSource }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category-items/${category}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative m-3 cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-lg bg-white transition-all duration-200"
    >
      {/* Background Image */}
      <img
        src={imgSource}
        alt={category}
        className="h-[320px] w-[300px] object-cover rounded-xl"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Text Content */}
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <h3 className="text-xl font-semibold">{category}</h3>
        <p className="text-sm text-gray-200 mb-3 line-clamp-2">{desc}</p>
        <div className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-3 py-1.5 rounded-full text-sm hover:bg-gray-200">
          Shop Now <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
