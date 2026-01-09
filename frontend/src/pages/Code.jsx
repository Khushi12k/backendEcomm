import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Code() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;

  // ✅ If user refreshes page
  if (!email) {
    navigate("/login");
    return null;
  }

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyOtp(e) {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/verify-login-otp`,
        { email, otp },
        { withCredentials: true } // ✅ IMPORTANT
      );

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  }

  async function resendOtp() {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/resend-login-otp`,
        { email },
        { withCredentials: true }
      );
      toast.success("OTP resent");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="otp-box">
      <h2>Enter Login OTP</h2>
      <p>
        OTP sent to <b>{email}</b>
      </p>

      <form onSubmit={verifyOtp}>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify</button>
      </form>

      <button
        onClick={resendOtp}
        disabled={loading}
        style={{ background: "none", border: "none", color: "blue" }}
      >
        {loading ? "Sending..." : "Resend OTP"}
      </button>

      <ToastContainer />
    </div>
  );
}

export default Code;
