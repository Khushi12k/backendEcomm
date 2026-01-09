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
    <>
      {/* ===== HEADER ===== */}
      <header className="admin-login-header">
        <h2
          className="brand-name"
          onClick={() => navigate("/")}
        >
          MyEcommerce
        </h2>

        <FaBars className="menu-icon" />
      </header>

      {/* ===== LOGIN FORM ===== */}
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
