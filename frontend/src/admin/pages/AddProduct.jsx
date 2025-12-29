import axios from "axios";
import React, { useState } from "react";

function AddProduct() {
  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    image: null,
  });

  const [slugError, setSlugError] = useState(""); 

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData({ ...data, image: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  // Generate slug from product name
  async function createSlug(e) {
    const nameValue = e.target.value;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    setData({ ...data, slug });
    checkSlug(slug); 
  }

 
  async function checkSlug(slug) {
    if (!slug) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/product/check-slug/${slug}`
      );


      setSlugError(""); 
    } catch (err) {
      if (err.response && err.response.data.message) {
        setSlugError(err.response.data.message); 
        setData({ ...data, slug: "" }); 
      } else {
        console.error(err);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.slug) {
      alert("Slug is required and must be unique!");
      return;
    }

    const product = new FormData();
    Object.keys(data).forEach((key) => {
      product.append(key, data[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/admin/product/add`,
        product,
        { withCredentials: true }
      );

      console.log("Product Added:", response.data);
      alert("Product added successfully!");
      // Reset form
      setData({
        name: "",
        slug: "",
        category: "",
        description: "",
        originalPrice: "",
        discountedPrice: "",
        image: null,
      });
      setSlugError("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="admin-add-form">
      <h2>Add a New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            name="name"
            value={data.name}
            onChange={handleChange}
            onBlur={createSlug} 
            required
          />
        </div>

        <div className="form-group">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={data.slug}
            readOnly
            placeholder="Slug will be generated automatically"
          />
          {slugError && <p style={{ color: "red" }}>{slugError}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={data.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={data.originalPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            value={data.discountedPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;


