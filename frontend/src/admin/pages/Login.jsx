import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext.jsx";
import { FaBars } from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post("/admin/login", data, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/admin/home", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* ===== HEADER ===== */}
      <header className="h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-md">
        <h2
          className="text-lg font-semibold cursor-pointer hover:text-blue-400 transition"
          onClick={() => navigate("/")}
        >
          MyEcommerce
        </h2>

        <FaBars className="text-xl cursor-pointer hover:text-gray-400 transition" />
      </header>

      {/* ===== LOGIN FORM ===== */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         transition"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-blue-600 to-blue-700
                         hover:from-blue-700 hover:to-blue-800
                         transform hover:-translate-y-1 transition-all
                         shadow-lg"
            >
              Login
            </button>
          </form>

          {/* INFO */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
