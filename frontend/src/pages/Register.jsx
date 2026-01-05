import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../contexts/LoaderContext";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const { setLoading } = useLoader();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function validate() {
    const { name, phone, username, email, password } = data;

    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }

    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters");
      return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 8-20 chars, include uppercase, lowercase, number & special char"
      );
      return false;
    }

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/register`,
        data
      );

      toast.success("🎉 User Registered Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-box">
      <h2>Register To Our E-commerce</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={data.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter 10-digit phone number"
          value={data.phone}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={data.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button type="submit">Register</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
