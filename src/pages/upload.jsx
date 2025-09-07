import React, { useState } from "react";

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const files = formData.getAll('images');
    const name = formData.get('name');
    const brand = formData.get('brand');
    const prevPrice = formData.get('prevprice');
    const newPrice = formData.get('newprice');
    const category = formData.get('category');

    console.log('Name:', name);
    console.log('Brand:', brand);
    console.log('Previous Price:', prevPrice);
    console.log('New Price:', newPrice);
    console.log('Category:', category);
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "alphaDB"); 
      data.append("cloud_name", "dnzlglcri");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dnzlglcri/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const fileRes = await res.json();
      uploadedUrls.push(fileRes.secure_url);
    }

    setUrls(uploadedUrls);
    setLoading(false);
    console.log("Uploaded URLs:", uploadedUrls);
  };

  return (
    <div className="App border border-gray-400 p-4">
      {loading ? <p>Uploading .......</p> : <p>Upload Images</p>}

      <form onSubmit={handleFileUpload}>
        <input type="file" name="images" className="file-input" multiple />
        <label htmlFor="name">Name : </label>
        <input type="text" name="name" id="name"/>
        <label htmlFor="brand">Brand : </label>
        <input type="text" name="brand" id="brand"/>
        <label htmlFor="prevprice">Prev Price : </label>
        <input type="number" name="prevprice" id="prevprice"/>
        <label htmlFor="newprice">New Price : </label>
        <input type="number" name="newprice" id="newprice"/>
        <label htmlFor="category">category : </label>
        <input type="text" name="category" id="category"/>
        <button type="submit">Upload</button>
      </form>
      

      <div className="mt-4">
        {urls.map((url, idx) => (
          <img key={idx} src={url} alt="uploaded" width="100" />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
