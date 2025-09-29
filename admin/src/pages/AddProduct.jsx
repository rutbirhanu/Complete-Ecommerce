import { useState } from "react";
import SideBarComponent from "../component/SideBarComponent";

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
    <div className="flex min-h-screen bg-[#f4f5f7] font-['Segoe_UI',sans-serif]">
      {/* Sidebar */}
      <SideBarComponent />

      {/* Main content */}
      <main className="flex-grow px-12 py-8">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-[1.6rem] text-[#1d3b7b] font-semibold">
            Add a New Product
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-12 bg-white rounded-lg shadow-md p-8"
        >
          {/* Left side */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-col mb-6">
              <label className="font-medium mb-2 text-gray-500">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                className="p-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1d3b7b] focus:outline-none focus:ring-2 focus:ring-[#5a6e75]/20"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="font-medium mb-2 text-gray-500">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleOnChange}
                className="p-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1d3b7b] focus:outline-none focus:ring-2 focus:ring-[#5a6e75]/20 resize-none min-h-[100px]"
              ></textarea>
            </div>

            <div className="flex flex-col mb-6">
              <label className="font-medium mb-2 text-gray-500">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleOnChange}
                className="p-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1d3b7b] focus:outline-none focus:ring-2 focus:ring-[#5a6e75]/20"
              />
            </div>

            <div className="flex flex-col mb-6">
              <label className="font-medium mb-2 text-gray-500">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleOnChange}
                className="p-2 border border-gray-300 rounded-lg text-gray-800 focus:border-[#1d3b7b] focus:outline-none focus:ring-2 focus:ring-[#5a6e75]/20"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-col mb-6">
              <label className="font-medium mb-2 text-gray-500">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleOnChange}
                className="block w-full text-sm text-gray-600 border border-gray-300 p-2  rounded-lg cursor-pointer focus:outline-none"
              />
            </div>

            {previewImage && (
              <div className="mt-6 overflow-hidden rounded-lg h-[200px] border-2 border-gray-300 flex justify-center items-center bg-gray-50">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full bg-[#5b8cf5] hover:bg-[#1d3b7b] text-white py-3 rounded-lg font-semibold shadow-md transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddProduct;
