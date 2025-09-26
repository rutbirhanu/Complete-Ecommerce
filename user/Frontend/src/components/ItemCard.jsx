/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import "./components.css"

function ItemCard({name, image, price,id}) {
  return (
    <Link to={`/product-detail/${id}`} >
    <div className='item-card-parent-container'>
      <div className="item-card-image">
        <img src={image} alt="item"/>
      </div>
      <div className="item-description">
        <p>{name}</p>
        <h6>${price}</h6>
      </div>
      </div>
      </Link>
  )
}

export default ItemCard

  {/* <Card style={{ width: '15rem', margin:"1em 2em" }}>
      <Card.Img variant="top" src={image} height="150px" />
      <Card.Body style={{ height: '5rem' }}>
        <Card.Text>
          {name}
          </Card.Text>
          <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card> */}