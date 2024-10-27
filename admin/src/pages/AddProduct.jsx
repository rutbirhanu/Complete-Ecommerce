import { useState } from "react"
import ButtonComponent from "../component/ButtonComponent"
import SideBarComponent from "../component/SideBarComponent"
import "./addProduct.css"

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category:""
  })
  
  const handleOnChange = (e) => {
   setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = {
    
  }

  return (
    <div className="add-product-container">
      <div className="content-wrapper">
        <SideBarComponent />
        <div className="main-content">
          <div className="main-title-container">
            <h2>Add Product</h2>
            <ButtonComponent />
          </div>

          <div className="add-product-form">
            <div className="left-side">
              <h2>Product Information</h2>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name"> Product Name</label>
                  <input type="text" name="name" onChange={handleOnChange} value={formData.name} />
                </div>

                <div>
                  <label htmlFor="description"> Product Description</label>
                  <input type="text" name="description" onChange={handleOnChange} value={formData.description} />
                </div>

                <div>
                  <label htmlFor="category">Category</label>
                  <input type="text" name="category" onChange={handleOnChange} value={formData.category}/>
                </div>

                <div>
                  <label htmlFor="price">Price</label>
                  <input type="text" name="price" onChange={handleOnChange} value={formData.price}/>
                </div>
              </form>
            </div>

            <div className="right-side">
              <h2>Upload Image</h2>
              <div className="product-image">
                <img src="https://assets.adidas.com/images/w_600,f_auto,q_auto/f2d9229b65c248488c78af3b00851dab_9366/Runfalcon_3.0_Shoes_White_HP7557_01_standard.jpg" />
                <button>Browse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AddProduct