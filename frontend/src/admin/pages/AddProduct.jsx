// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../../axiosConfig.js";
// import { toast } from "react-toastify";
// import { useLoader } from "../../contexts/LoaderContext.jsx"; // ✅ import loader

// function AddProduct() {
//   const navigate = useNavigate();
//   const { setLoading } = useLoader(); // ✅ loader

//   const [data, setData] = useState({
//     name: "",
//     slug: "",
//     category: "",
//     description: "",
//     originalPrice: "",
//     discountedPrice: "",
//     images: [], // multiple images
//     status: true,
//   });

//   const [previews, setPreviews] = useState([]); // array of {url, name}
//   const [slugError, setSlugError] = useState("");

//   // ================= HANDLE CHANGE =================
//   function handleChange(e) {
//     const { name, value, files, type, checked } = e.target;

//     if (name === "images") {
//       if (!files) return;
//       const selectedFiles = Array.from(files);
//       if (selectedFiles.length + previews.length > 5) {
//         toast.error("You can select max 5 images");
//         return;
//       }
//       const newPreviews = selectedFiles.map((file) => ({
//         url: URL.createObjectURL(file),
//         name: file.name,
//       }));
//       setPreviews((prev) => [...prev, ...newPreviews]);
//       setData((prev) => ({ ...prev, images: [...prev.images, ...selectedFiles] }));
//     } else if (type === "checkbox") {
//       setData({ ...data, [name]: checked });
//     } else {
//       setData({ ...data, [name]: value });
//     }
//   }

//   // ================= SLUG GENERATE + CHECK =================
//   async function createSlug(e) {
//     const nameValue = e.target.value;
//     if (!nameValue) return;

//     const slug = nameValue
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "")
//       .replace(/-+/g, "-");

//     setData((prev) => ({ ...prev, slug }));
//     setLoading(true); // ✅ show loader during slug check
//     try {
//       await instance.get(`/product/checkSlug/${slug}?t=${Date.now()}`);
//       setSlugError("");
//     } catch (err) {
//       const msg = err.response?.data?.message || "You have same slug, please change product name";
//       setSlugError(msg);
//       toast.error(msg);
//       setData((prev) => ({ ...prev, slug: "" }));
//     } finally {
//       setLoading(false); // ✅ hide loader
//     }
//   }

//   // ================= SUBMIT =================
//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!data.slug) {
//       toast.error("Slug is required and must be unique!");
//       return;
//     }

//     if (data.images.length === 0) {
//       toast.error("Please select at least one image");
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(data).forEach((key) => {
//       if (key === "images") {
//         data.images.forEach((file) => formData.append("image", file));
//       } else {
//         formData.append(key, data[key]);
//       }
//     });

//     setLoading(true); // ✅ show loader during submission
//     try {
//       await instance.post("/product/add", formData, { withCredentials: true });
//       toast.success("Product added successfully!");
//       setTimeout(() => navigate("/admin/product-list"), 800);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Product add failed");
//     } finally {
//       setLoading(false); // ✅ hide loader
//     }
//   }

//   return (
//     <div className="admin-add-form">
//       <h2>Add Product</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product name"
//           value={data.name}
//           onChange={handleChange}
//           onBlur={createSlug}
//           required
//         />

//         <input type="text" name="slug" placeholder="Slug (auto-generated)" value={data.slug} readOnly />
//         {slugError && <p style={{ color: "red" }}>{slugError}</p>}

//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={data.category}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={data.description}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="originalPrice"
//           placeholder="Original price"
//           value={data.originalPrice}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="discountedPrice"
//           placeholder="Discounted price"
//           value={data.discountedPrice}
//           onChange={handleChange}
//           required
//         />

//         <input type="file" name="images" accept="image/*" multiple onChange={handleChange} />

//         {/* ================= Multiple Previews ================= */}
//         {previews.length > 0 && (
//           <div className="image-preview-container">
//             {previews.map((p, i) => (
//               <div className="image-preview-box" key={i}>
//                 <img src={p.url} alt={p.name} />
//                 <div>{p.name}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext.jsx";

function AddProduct() {
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  /* ================= CATEGORY STATE ================= */
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    images: [],
    status: true,
  });

  const [previews, setPreviews] = useState([]);
  const [slugError, setSlugError] = useState("");

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await instance.get("/category");
        setCategories(res.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  function handleChange(e) {
    const { name, value, files, type, checked } = e.target;

    if (name === "images") {
      if (!files) return;
      const selectedFiles = Array.from(files);

      if (selectedFiles.length + previews.length > 5) {
        toast.error("You can select max 5 images");
        return;
      }

      const newPreviews = selectedFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      setPreviews((prev) => [...prev, ...newPreviews]);
      setData((prev) => ({
        ...prev,
        images: [...prev.images, ...selectedFiles],
      }));
    } else if (type === "checkbox") {
      setData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  }

  /* ================= SLUG GENERATE + CHECK ================= */
  async function createSlug(e) {
    const nameValue = e.target.value;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    setData((prev) => ({ ...prev, slug }));
    setLoading(true);

    try {
      await instance.get(`/product/checkSlug/${slug}?t=${Date.now()}`);
      setSlugError("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Same slug exists, please change product name";
      setSlugError(msg);
      toast.error(msg);
      setData((prev) => ({ ...prev, slug: "" }));
    } finally {
      setLoading(false);
    }
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!data.slug) {
      toast.error("Slug is required");
      return;
    }

    if (!data.category) {
      toast.error("Please select a category");
      return;
    }

    if (data.images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((file) => formData.append("image", file));
      } else {
        formData.append(key, data[key]);
      }
    });

    setLoading(true);
    try {
      await instance.post("/product/add", formData, {
        withCredentials: true,
      });
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/admin/product-list"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Product add failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-add-form">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* PRODUCT NAME */}
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={data.name}
          onChange={handleChange}
          onBlur={createSlug}
          required
        />

        {/* SLUG */}
        <input
          type="text"
          name="slug"
          placeholder="Slug (auto-generated)"
          value={data.slug}
          readOnly
        />
        {slugError && <p style={{ color: "red" }}>{slugError}</p>}

        {/* ✅ CATEGORY DROPDOWN (FIXED) */}
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={data.description}
          onChange={handleChange}
          required
        />

        {/* PRICES */}
        <input
          type="number"
          name="originalPrice"
          placeholder="Original price"
          value={data.originalPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discountedPrice"
          placeholder="Discounted price"
          value={data.discountedPrice}
          onChange={handleChange}
          required
        />

        {/* IMAGES */}
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
        />

        {/* IMAGE PREVIEW */}
        {previews.length > 0 && (
          <div className="image-preview-container">
            {previews.map((p, i) => (
              <div className="image-preview-box" key={i}>
                <img src={p.url} alt={p.name} />
                <div>{p.name}</div>
              </div>
            ))}
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
