import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import instance from "../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { checkIsLoggedIn, setIsLoggedIn } = useAuth();
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
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/login`,
        data,
        { withCredentials: true }
      );

      checkIsLoggedIn();
      toast.success("Login successful");

      // ✅ go back to product page
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  }

  async function handleGoogleSuccess(credentialResponse) {
    try {
      await instance.post("/user/google-login", {
        token: credentialResponse.credential,
      });

      toast.success("Google login successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    }
  }

  function handleGoogleError() {
    toast.error("Google Login Failed");
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

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>
      </form>

      <Link to="/register">Register</Link>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;











