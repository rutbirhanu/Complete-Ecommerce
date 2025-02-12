import { useState } from "react";
import SideBarComponent from "../component/SideBarComponent";
import "./addProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));

    if (files) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:3500/product/add-product", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div className="add-product-container">
      <SideBarComponent />
      <main className="main-content">
        <div className="main-header">
          <h2>Add a New Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-left">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleOnChange} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleOnChange}></textarea>
            </div>

            <div className="form-group">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleOnChange} />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleOnChange} />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleOnChange} />
            </div>

            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Preview" />
              </div>
            )}

            <button className="submit-btn" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddProduct;
