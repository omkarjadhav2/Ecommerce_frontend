import axios from "axios";
import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const { uploadProduct } = useContext(ProductContext);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const files = formData.getAll("images");
    const name = formData.get("name");
    const brand = formData.get("brand");
    const prevPrice = formData.get("prevprice");
    const newPrice = formData.get("newprice");
    const category = formData.get("category");
    const material = formData.get("material");
    const color = formData.get("color");
    const subCategory = formData.get("subcategory");
    const stock = formData.get("stock");
    const description = formData.get("description");
    const bestseller = formData.get("bestseller");
    const sizes = formData.getAll("sizes").map((s) => ({ value: parseInt(s) }));

    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", "alphaDB");
      formData.append("cloud_name", "dnzlglcri");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnzlglcri/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const fileRes = await res.json();
      uploadedUrls.push(fileRes.secure_url);
    }

    const productData = {
      name,
      brand,
      prevprice: prevPrice,
      newprice: newPrice,
      category,
      material,
      color,
      subCategory,
      stock,
      bestseller,
      description,
      sizes,
      images: uploadedUrls.map((url) => ({ url })),
    };

    const success = await uploadProduct(productData);
    if (success) {
      alert("product uploaded");
      e.target.reset();
      setUrls([]);
    }

    setUrls(uploadedUrls);
    setLoading(false);
    console.log("Uploaded URLs:", uploadedUrls);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          {loading ? "Uploading..." : "Upload Product"}
        </h2>

        <form onSubmit={handleFileUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Images
            </label>
            <input
              type="file"
              name="images"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              multiple
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="prevprice"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Previous Price
              </label>
              <input
                type="number"
                name="prevprice"
                min="1"
                id="prevprice"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="newprice"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                New Price
              </label>
              <input
                type="number"
                name="newprice"
                min="1"
                id="newprice"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              min="1"
              id="stock"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Colour
            </label>
            <input
              type="text"
              name="color"
              id="color"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Material
            </label>
            <input
              type="text"
              name="material"
              id="material"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Sub-Category
            </label>
            <input
              type="text"
              name="subcategory"
              id="subcategory"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Sizes
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                <label key={size} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    name="sizes"
                    value={size}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center border-1 p-3">
            <input
              type="checkbox"
              name="bestseller"
              id="bestseller"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="bestseller"
              className="ml-2 block text-sm text-blue-700"
            >
              Bestseller
            </label>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="50"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {urls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="uploaded"
              className="w-full h-24 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
