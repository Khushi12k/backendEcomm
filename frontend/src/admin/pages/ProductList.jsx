import { useEffect, useState } from "react";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext.jsx";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [displayCount, setDisplayCount] = useState(20);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const { setLoading } = useLoader();

  // ================= GET PRODUCTS =================
  async function getProducts() {
    setLoading(true);
    try {
      const res = await instance.get("/product", { withCredentials: true });
      let data = res.data || [];

      // sort by price
      data.sort((a, b) => a.discountedPrice - b.discountedPrice);

      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // ================= DELETE =================
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

  // ================= EDIT =================
  function startEdit(product) {
    setEditingId(product._id);
    setEditData({
      name: product.name,
      category: product.category,
      discountedPrice: product.discountedPrice,
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  }

  async function updateProduct(id) {
    setLoading(true);
    try {
      await instance.put(`/product/${id}`, editData, {
        withCredentials: true,
      });
      toast.success("Product updated");
      setEditingId(null);
      getProducts();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  }

  // ================= FILTER =================
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchName.toLowerCase()) &&
      p.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const visibleProducts = filtered.slice(0, displayCount);

  return (
    <div className="admin-product-list">
      <h2>All Products</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>

      <table border="1" width="100%">
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
          {visibleProducts.map((p) => (
            <tr key={p._id}>
              <td>
                {editingId === p._id ? (
                  <input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.name
                )}
              </td>

              <td>
                {editingId === p._id ? (
                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.category
                )}
              </td>

              <td>
                {editingId === p._id ? (
                  <input
                    name="discountedPrice"
                    type="number"
                    value={editData.discountedPrice}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.discountedPrice
                )}
              </td>

              {/* ✅ IMAGE FIX (FINAL & CORRECT) */}
              <td>
                <img
                  src={`${import.meta.env.VITE_BASEURL}/${
                    p.images?.length > 0 ? p.images[0] : p.image
                  }`}
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  alt={p.name || "product"}
                />
              </td>

              <td>
                {editingId === p._id ? (
                  <>
                    <button onClick={() => updateProduct(p._id)}>✅</button>
                    <button onClick={() => setEditingId(null)}>❌</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(p)}>✏️</button>
                    <button onClick={() => deleteProduct(p._id)}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
