import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../axiosConfig.js";

function AdminLogin() {
  const navigate = useNavigate();

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

    try {
      const response = await instance.post(
        "/admin/login",
        data,
        { withCredentials: true }
      );

      console.log("Login success", response.data);
      alert("Login successfully in Admin");

      // ✅ CORRECT ROUTE
      navigate("/admin/home");

    } catch (error) {
      console.log("login error", error);
      alert("Invalid email or password Admin");
    }
  }

  return (
    <div className="admin-login-box">
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <Link to="/register" className="register">
        Register
      </Link>
    </div>
  );
}

export default AdminLogin;
