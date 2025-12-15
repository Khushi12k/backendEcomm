import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
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
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data,
        { withCredentials: true }
      );

      console.log("Login success", response.data);
      alert("Logged in successfully");

      navigate("/");
    } catch (error) {
      console.log("Login error", error);
      alert("Invalid email or password");
    }
  }

  return (
    <div className="login-box">
      <h1>Login to your account</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;