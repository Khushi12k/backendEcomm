import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../axiosConfig.js";
import { toast } from "react-toastify";
import { useLoader } from "../../contexts/LoaderContext.jsx"; // ✅ import loader

function AdminLogin() {
  const navigate = useNavigate();
  const { setLoading } = useLoader(); // ✅ get loader function

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // ✅ show loader
    try {
      const res = await instance.post("/admin/login", data, { withCredentials: true });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/admin/home", { replace: true });
      }, 800);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false); // ✅ hide loader
    }
  }

  return (
    <div className="admin-login-box">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default AdminLogin;








