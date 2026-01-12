// import { useEffect, useState } from "react";
// import instance from "../../axiosConfig.js";
// import { toast } from "react-toastify";
// import { useLoader } from "../../contexts/LoaderContext.jsx";

// /* ================= IMAGE RESOLVER ================= */
// const resolveImage = (img) => {
//   if (!img) return "/no-image.png";
//   if (img.startsWith("http")) return img;
//   return `${import.meta.env.VITE_BASEURL}/${img}`;
// };

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [searchName, setSearchName] = useState("");
//   const [searchCategory, setSearchCategory] = useState("");

//   const [editingProduct, setEditingProduct] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [editImage, setEditImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState("");

//   const { setLoading } = useLoader();

//   /* ================= GET PRODUCTS ================= */
//   async function getProducts() {
//     setLoading(true);
//     try {
//       const res = await instance.get("/product", { withCredentials: true });
//       setProducts(res.data || []);
//     } catch {
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);

//   /* ================= DELETE ================= */
//   async function deleteProduct(id) {
//     if (!window.confirm("Delete product?")) return;
//     setLoading(true);
//     try {
//       await instance.delete(`/product/${id}`, { withCredentials: true });
//       toast.success("Product deleted");
//       getProducts();
//     } catch {
//       toast.error("Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ================= EDIT ================= */
//   function startEdit(product) {
//     setEditingProduct(product);
//     setEditData({
//       name: product.name,
//       category: product.category,
//       discountedPrice: product.discountedPrice,
//     });
//     setPreviewImage(product.images?.[0] || product.image);
//     setEditImage(null);
//   }

//   function handleEditChange(e) {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   }

//   function handleImageChange(e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     setEditImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   }

//   async function updateProduct() {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", editData.name);
//       formData.append("category", editData.category);
//       formData.append("discountedPrice", editData.discountedPrice);
//       if (editImage) formData.append("image", editImage);

//       await instance.put(`/product/${editingProduct._id}`, formData, {
//         withCredentials: true,
//       });

//       toast.success("Product updated");
//       setEditingProduct(null);
//       getProducts();
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   /* ================= FILTER ================= */
//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(searchName.toLowerCase()) &&
//       p.category.toLowerCase().includes(searchCategory.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         All Products
//       </h2>

//       {/* FILTERS */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-4xl mx-auto">
//         <input
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//         <input
//           placeholder="Search by category"
//           value={searchCategory}
//           onChange={(e) => setSearchCategory(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Category</th>
//               <th className="px-4 py-3">Price</th>
//               <th className="px-4 py-3">Image</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((p) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-3 truncate max-w-[220px]">{p.name}</td>
//                 <td className="px-4 py-3 truncate max-w-[180px]">{p.category}</td>
//                 <td className="px-4 py-3 font-semibold">₹{p.discountedPrice}</td>

//                 <td className="px-4 py-3">
//                   <img
//                     src={resolveImage(p.images?.[0] || p.image)}
//                     className="w-12 h-12 object-contain bg-gray-50 rounded-md border"
//                     alt={p.name}
//                   />
//                 </td>

//                 <td className="px-4 py-3">
//                   <button
//                     onClick={() => startEdit(p)}
//                     className="px-3 py-1 mr-2 rounded-md bg-green-500 text-white hover:bg-green-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteProduct(p._id)}
//                     className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="py-6 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= EDIT MODAL ================= */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
//             <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

//             <div className="space-y-4">
//               <input
//                 name="name"
//                 value={editData.name}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />

//               <input
//                 name="category"
//                 value={editData.category}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />

//               <input
//                 type="number"
//                 name="discountedPrice"
//                 value={editData.discountedPrice}
//                 onChange={handleEditChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />

//               {/* 🔥 PERFECT IMAGE PREVIEW */}
//               <div className="w-full h-56 bg-gray-50 border rounded-xl flex items-center justify-center overflow-hidden">
//                 <img
//                   src={resolveImage(previewImage)}
//                   alt="preview"
//                   className="max-h-full max-w-full object-contain"
//                 />
//               </div>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="text-sm"
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setEditingProduct(null)}
//                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={updateProduct}
//                 className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductList;






import { useEffect, useState } from "react";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext.jsx";

/* ================= IMAGE RESOLVER ================= */
const resolveImage = (img) => {
  if (!img) return "/no-image.png";
  if (img.startsWith("http")) return img;
  return `${import.meta.env.VITE_BASEURL}/${img}`;
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const { setLoading } = useLoader();

  /* ================= GET PRODUCTS ================= */
  async function getProducts() {
    setLoading(true);
    try {
      const res = await instance.get("/product", { withCredentials: true });
      setProducts(res.data || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  /* ================= DELETE ================= */
  async function deleteProduct(id) {
    if (!window.confirm("Delete product?")) return;
    setLoading(true);
    try {
      await instance.delete(`/product/${id}`, { withCredentials: true });
      toast.success("Product deleted");
      getProducts();
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= EDIT ================= */
  function startEdit(product) {
    setEditingProduct(product);
    setEditData({
      name: product.name,
      category: product.category,
      discountedPrice: product.discountedPrice,
    });
    setPreviewImage(product.images?.[0] || product.image);
    setEditImage(null);
  }

  function handleEditChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setEditImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  async function updateProduct() {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("category", editData.category);
      formData.append("discountedPrice", editData.discountedPrice);
      if (editImage) formData.append("image", editImage);

      await instance.put(`/product/${editingProduct._id}`, formData, {
        withCredentials: true,
      });

      toast.success("Product updated");
      setEditingProduct(null);
      getProducts();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= FILTER + SORT ================= */
  let filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase()) &&
      p.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.discountedPrice - b.discountedPrice);
  }
  if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }
  if (sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortBy === "category") {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        All Products
      </h2>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 max-w-6xl mx-auto">
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="category">Category: A → Z</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 truncate max-w-[220px]">{p.name}</td>
                <td className="px-4 py-3 truncate max-w-[180px]">{p.category}</td>
                <td className="px-4 py-3 font-semibold">₹{p.discountedPrice}</td>

                <td className="px-4 py-3">
                  <img
                    src={resolveImage(p.images?.[0] || p.image)}
                    className="w-12 h-12 object-contain bg-gray-50 rounded-md border"
                    alt={p.name}
                  />
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => startEdit(p)}
                    className="px-3 py-1 mr-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

            <div className="space-y-4">
              <input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="discountedPrice"
                value={editData.discountedPrice}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div className="w-full h-56 bg-gray-50 border rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={resolveImage(previewImage)}
                  alt="preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
