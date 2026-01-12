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
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Categories
        </h1>

        {/* ADD CATEGORY FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Add Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Slug"
              value={slug}
              readOnly
              className="w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-600"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl
                         hover:bg-blue-700 hover:shadow-lg transition"
            >
              Add Category
            </button>
          </form>
        </div>

        {/* CATEGORY LIST */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            All Categories
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Slug
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-8 text-gray-500"
                    >
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr
                      key={cat._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {cat.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {cat.slug}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Categories;
