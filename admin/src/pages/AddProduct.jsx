import { useState } from "react"
import ButtonComponent from "../component/ButtonComponent"
import SideBarComponent from "../component/SideBarComponent"
import "./addProduct.css"

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image:""
  })
  
  const [previewImage, setPreviewImage]= useState(null)

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value 
    }));
    setPreviewImage(URL.createObjectURL(files[0]))
};


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);

    const req = await fetch("http://localhost:3500/product/add-product", {
      method: "POST",
      body:formDataToSend
    })
    const response= await req.json()
    console.log(response)
  }

  return (
    <div className="add-product-container">
      <div className="content-wrapper">
        <SideBarComponent />
        <div className="main-content">
        <form onSubmit={handleSubmit}>

          <div className="main-title-container">
            <h2>Add Product</h2>
            <ButtonComponent />
          </div>

          <div className="add-product-form">
            <div className="left-side">
              <h2>Product Information</h2>

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
              </div>


            <div className="right-side">
              <h2 style={{marginBottom:"1em"}}>Upload Image</h2>
              <input type="file" name="image" onChange={handleOnChange} />
              <div className="product-image">
                <img src={previewImage} />
                <button>Browse</button>
              </div>

            </div>
          </div>
          </form>

        </div>
      </div>
    </div>

  )
}

export default AddProduct