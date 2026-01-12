import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/register`,
        data
      );
      toast.success("Registered successfully 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

          {/* LEFT IMAGE */}
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              className="w-full h-full object-cover"
              alt="signup"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/80 to-purple-600/80" />
          </div>

          {/* RIGHT FORM */}
          <div className="px-10 py-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-10">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* INPUT */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="form-input"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
                className="form-input"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="form-input"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                required
                className="form-input"
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="form-input pr-12"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </span>
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" required />
                <span>I agree to the Terms of User</span>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full py-4 rounded-full
                  bg-gradient-to-r from-pink-500 to-purple-600
                  text-white text-lg font-semibold
                  shadow-lg hover:opacity-90 transition
                "
              >
                Sign Up
              </button>

              {/* LOGIN */}
              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600 font-medium">
                  Sign in →
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}

export default Register;
