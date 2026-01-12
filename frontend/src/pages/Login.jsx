import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);

  /* ================= GOOGLE INIT (ON PAGE LOAD) ================= */
  useEffect(() => {
    if (!window.google) {
      console.error("Google SDK not loaded");
      return;
    }

    // 🔥 HARD-CODED CLIENT ID (NO ENV USED)
    window.google.accounts.id.initialize({
      client_id:
        "540952180572-umq2khmu4m523emshel1qa6bsc40nhae.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    // ✅ OFFICIAL GOOGLE BUTTON RENDER
    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 320,
      }
    );
  }, []);

  /* ================= GOOGLE CALLBACK ================= */
  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/google-login`,
        { token: response.credential },
        { withCredentials: true }
      );

      // SAVE USER INFO
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(`Logged in as ${res.data.user.email}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  /* ================= NORMAL LOGIN ================= */
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/login`,
        data,
        { withCredentials: true }
      );

      if (res.data.otpRequired) {
        setOtpRequired(true);
        toast.info("OTP sent to your email");
      } else {
        toast.success("Login successful");
        navigate("/");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/verify-login-otp`,
        { email: data.email, otp },
        { withCredentials: true }
      );
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* NORMAL LOGIN */}
        {!otpRequired ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-center">Enter the OTP sent to your email</p>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* DIVIDER */}
        <div className="my-6 text-center text-sm text-gray-500">OR</div>

        {/* ✅ GOOGLE BUTTON CONTAINER (DO NOT ADD onClick) */}
        <div id="googleBtn" className="flex justify-center"></div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default Login;
