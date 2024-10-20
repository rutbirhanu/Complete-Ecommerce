import "./addProduct.css"

function AddProduct() {
  return (
    <div className="add-product-container">
      <div className="main-title-container">
        <h2>Add Product</h2>
        <div className="upload-btn">
          <button>Upload Product</button>
        </div>
      </div>

      <div className="add-product-form">
        <div className="left-side">
          <h2>Product Information</h2>

          <form >
            <div>
              <label htmlFor="name"> Product Name</label>
              <input type="text" name="name" />
            </div>

            <div>
              <label htmlFor="description"> Product Description</label>
              <input type="text" name="description" />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input type="text" name="category" />
            </div>

            <div>
              <label htmlFor="price">Price</label>
              <input type="text" name="price" />
            </div>
          </form>
        </div>

        <div className="right-side">
          <h2>Upload Image</h2>
          <div className="product-image">
            <img src="https://assets.adidas.com/images/w_600,f_auto,q_auto/f2d9229b65c248488c78af3b00851dab_9366/Runfalcon_3.0_Shoes_White_HP7557_01_standard.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct