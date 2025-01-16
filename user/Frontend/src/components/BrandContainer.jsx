/* eslint-disable react/prop-types */
import "./components.css"
function BrandContainer({imgSource}) {
  return (
      <div className='brand-container'>
          <img src={imgSource} height="96px" width="96px"/>
    </div>
  )
}

export default BrandContainer