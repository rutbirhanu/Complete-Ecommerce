/* eslint-disable react/prop-types */
import "./components.css"
import { useNavigate } from "react-router-dom"

function CategoryCard({ desc, category, imgSource }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/category-items/${category}`);
  };
  return (
      <div className="category-card" onClick={handleClick}>
          <div className='category-card-overlay'>
              <p>{ desc}</p>
              <h5>{category}</h5>
          </div>
      <img src={imgSource} />
    </div>
  )
}

export default CategoryCard