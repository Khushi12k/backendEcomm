// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../../axiosConfig.js";
// import { toast } from "react-toastify";
// import { useLoader } from "../../contexts/LoaderContext.jsx";

// function AddProduct() {
//   const navigate = useNavigate();
//   const { setLoading } = useLoader();

//   const [categories, setCategories] = useState([]);

//   const [data, setData] = useState({
//     name: "",
//     slug: "",
//     category: "",
//     description: "",
//     originalPrice: "",
//     discountedPrice: "",
//     images: [],
//     status: true,
//   });

//   const [previews, setPreviews] = useState([]);
//   const [slugError, setSlugError] = useState("");

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await instance.get("/category");
//         setCategories(res.data);
//       } catch (err) {
//         toast.error("Failed to load categories");
//       }
//     }
//     fetchCategories();
//   }, []);

//   /* ================= HANDLE CHANGE ================= */
//   function handleChange(e) {
//     const { name, value, files } = e.target;

//     if (name === "images") {
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
//       setData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...selectedFiles],
//       }));
//     } else {
//       setData((prev) => ({ ...prev, [name]: value }));
//     }
//   }

//   /* ================= SLUG GENERATE ================= */
//   async function createSlug(e) {
//     const nameValue = e.target.value;
//     if (!nameValue) return;

//     const slug = nameValue
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "")
//       .replace(/-+/g, "-");

//     setData((prev) => ({ ...prev, slug }));
//     setLoading(true);

//     try {
//       await instance.get(`/product/checkSlug/${slug}?t=${Date.now()}`);
//       setSlugError("");
//     } catch (err) {
//       const msg =
//         err.response?.data?.message ||
//         "Same slug exists, please change product name";
//       setSlugError(msg);
//       toast.error(msg);
//       setData((prev) => ({ ...prev, slug: "" }));
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ================= SUBMIT ================= */
//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!data.slug || !data.category || data.images.length === 0) {
//       toast.error("Please fill all required fields");
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

//     setLoading(true);
//     try {
//       await instance.post("/product/add", formData, {
//         withCredentials: true,
//       });
//       toast.success("Product added successfully!");
//       setTimeout(() => navigate("/admin/product-list"), 800);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Product add failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Add Product
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           className="space-y-4"
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Product name"
//             value={data.name}
//             onChange={handleChange}
//             onBlur={createSlug}
//             required
//             className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <input
//             type="text"
//             name="slug"
//             placeholder="Slug"
//             value={data.slug}
//             readOnly
//             className="w-full px-4 py-3 border rounded-xl bg-gray-100"
//           />

//           {slugError && (
//             <p className="text-sm text-red-500">{slugError}</p>
//           )}

//           <select
//             name="category"
//             value={data.category}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat.slug}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <textarea
//             name="description"
//             placeholder="Product description"
//             value={data.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="number"
//               name="originalPrice"
//               placeholder="Original price"
//               value={data.originalPrice}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <input
//               type="number"
//               name="discountedPrice"
//               placeholder="Discounted price"
//               value={data.discountedPrice}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <input
//             type="file"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleChange}
//             className="w-full"
//           />

//           {previews.length > 0 && (
//             <div className="flex gap-3 overflow-x-auto mt-3 pb-2">
//               {previews.map((p, i) => (
//                 <div
//                   key={i}
//                   className="flex-shrink-0 text-center text-xs"
//                 >
//                   <img
//                     src={p.url}
//                     alt={p.name}
//                     className="w-20 h-20 object-cover rounded-lg border"
//                   />
//                   <p className="truncate w-20">{p.name}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-md hover:scale-[1.03] hover:shadow-xl transition"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
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

  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);
  const [slugError, setSlugError] = useState("");

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await instance.get("/category");
        setCategories(res.data);
      } catch {
        toast.error("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "images") {
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
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  }

  /* ================= SLUG ================= */
  async function createSlug(e) {
    const value = e.target.value;
    if (!value) return;

    const slug = value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    setData((prev) => ({ ...prev, slug }));
    setLoading(true);

    try {
      await instance.get(`/product/checkSlug/${slug}`);
      setSlugError("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Same slug exists, change product name";
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

    if (!data.slug || !data.category || data.images.length === 0) {
      toast.error("Please fill all required fields");
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
      toast.success("Product added successfully");
      setTimeout(() => navigate("/admin/product-list"), 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Add product failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={data.name}
            onChange={handleChange}
            onBlur={createSlug}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={data.slug}
            readOnly
            className="w-full px-4 py-3 border rounded-xl bg-gray-100"
          />

          {slugError && (
            <p className="text-sm text-red-500">{slugError}</p>
          )}

          <select
            name="category"
            value={data.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Product description"
            value={data.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* 🔥 NUMBER INPUTS (SPINNER REMOVED) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="originalPrice"
              placeholder="Original price"
              value={data.originalPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none
                         appearance-none
                         [&::-webkit-inner-spin-button]:appearance-none
                         [&::-webkit-outer-spin-button]:appearance-none"
            />

            <input
              type="number"
              name="discountedPrice"
              placeholder="Discounted price"
              value={data.discountedPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none
                         appearance-none
                         [&::-webkit-inner-spin-button]:appearance-none
                         [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full text-sm"
          />

          {previews.length > 0 && (
            <div className="flex gap-3 overflow-x-auto mt-3 pb-2">
              {previews.map((p, i) => (
                <div key={i} className="flex-shrink-0 text-center text-xs">
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <p className="truncate w-20">{p.name}</p>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-md hover:scale-[1.03] hover:shadow-xl transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
