import { useEffect, useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext";

function Categories() {
  const { setLoading } = useLoader();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  /* ================= AUTO SLUG ================= */
  function generateSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  }

  /* ================= FETCH CATEGORIES ================= */
  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await instance.get("/category");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ADD CATEGORY ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !slug) {
      toast.error("Name & slug required");
      return;
    }

    setLoading(true);
    try {
      await instance.post(
        "/category/add",
        { name, slug },
        { withCredentials: true }
      );

      toast.success("Category added");
      setName("");
      setSlug("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Category add failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-home">
      <h1>Categories</h1>

      {/* ADD CATEGORY FORM */}
      <form onSubmit={handleSubmit} className="admin-card">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
            setSlug(generateSlug(value));
          }}
          required
        />

        <input
          type="text"
          placeholder="Slug"
          value={slug}
          readOnly
        />

        <button type="submit">Add Category</button>
      </form>

      {/* CATEGORY LIST */}
      <div className="admin-users" style={{ marginTop: "40px" }}>
        <h2>All Categories</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            ) : (
              categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.slug}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
