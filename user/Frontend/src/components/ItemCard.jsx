/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

function ItemCard({ name, image, price, id }) {
  return (
    <Link to={`/product-detail/${id}`}>
      <div className="h-[11em] w-[9.5em] flex flex-col justify-center items-center m-[7px_10px_1rem_10px] rounded-[3px]">
        
        {/* Image */}
        <div className="item-card-image">
          <img
            src={image}
            alt={name}
            className="w-[7.5em] h-[7.5em] rounded-tl-[1px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[1px] shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#fff] object-cover"
          />
        </div>

        {/* Description */}
        <div className="item-description m-[4px_10px] text-center">
          <p className="font-sans font-medium text-[15px] overflow-x-hidden m-[3px]">{name}</p>
          <h6 className="font-sans font-bold text-[15px] m-[3px]">${price}</h6>
        </div>
      </div>
    </Link>
  );
}


export default ItemCard

  