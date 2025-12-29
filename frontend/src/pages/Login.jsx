import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Login() {
  const { checkIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      await axios.post(`${import.meta.env.VITE_BASEURL}/user/login`, data, {
        withCredentials: true,
      });
      checkIsLoggedIn();

      // ✅ go back to product page
      navigate(location.state?.from || "/");
    } catch (error) {
      alert("Invalid email or password");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>

      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
