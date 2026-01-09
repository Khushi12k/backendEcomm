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
        headers: { "Content-Type": "multipart/form-data" },
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

  /* ================= FILTER ================= */
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase()) &&
      p.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="admin-product-list">
      <h2>All Products</h2>

      <div className="product-filters">
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((p) => (
            <tr key={p._id}>
              <td>
                <span className="table-text">{p.name}</span>
              </td>
              <td>
                <span className="table-text">{p.category}</span>
              </td>
              <td>₹{p.discountedPrice}</td>
              <td>
                <img
                  src={resolveImage(p.images?.[0] || p.image)}
                  alt={p.name}
                />
              </td>
              <td>
                <button className="edit-btn" onClick={() => startEdit(p)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Product</h3>

            <input
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              placeholder="Product Name"
            />

            <input
              name="category"
              value={editData.category}
              onChange={handleEditChange}
              placeholder="Category"
            />

            <input
              type="number"
              name="discountedPrice"
              value={editData.discountedPrice}
              onChange={handleEditChange}
              placeholder="Price"
            />

            <div className="image-preview">
              <img src={resolveImage(previewImage)} alt="preview" />
            </div>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            <div className="modal-actions">
              <button className="save-btn" onClick={updateProduct}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
