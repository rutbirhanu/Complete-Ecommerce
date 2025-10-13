/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ItemCard({ name, image, price, id, description }) {
  return (
    <Link
      to={`/product-detail/${id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 w-[12rem] m-3"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="h-[10rem] w-full object-cover rounded-t-xl"
        />

        {/* Add to Cart Icon (appears subtly on hover) */}
        <div className="absolute top-2 right-2 bg-white/90 text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
          <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 text-center">
        <p className="font-semibold text-gray-800 text-sm truncate">
          {name}
        </p>
        {description && (
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{description}</p>
        )}
        <div className="mt-2 font-bold text-gray-900 text-base">
          ${price}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
