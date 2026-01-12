// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// function Code() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const email = state?.email;

//   // ✅ If user refreshes page
//   if (!email) {
//     navigate("/login");
//     return null;
//   }

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function verifyOtp(e) {
//     e.preventDefault();

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASEURL}/user/verify-login-otp`,
//         { email, otp },
//         { withCredentials: true } // ✅ IMPORTANT
//       );

//       toast.success("Login successful");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     }
//   }

//   async function resendOtp() {
//     setLoading(true);
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASEURL}/user/resend-login-otp`,
//         { email },
//         { withCredentials: true }
//       );
//       toast.success("OTP resent");
//     } catch {
//       toast.error("Failed to resend OTP");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="otp-box">
//       <h2>Enter Login OTP</h2>
//       <p>
//         OTP sent to <b>{email}</b>
//       </p>

//       <form onSubmit={verifyOtp}>
//         <input
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           maxLength={6}
//           placeholder="Enter OTP"
//           required
//         />
//         <button type="submit">Verify</button>
//       </form>

//       <button
//         onClick={resendOtp}
//         disabled={loading}
//         style={{ background: "none", border: "none", color: "blue" }}
//       >
//         {loading ? "Sending..." : "Resend OTP"}
//       </button>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Code;



import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Code() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;

  // ✅ If page refreshed or accessed directly
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
        { withCredentials: true }
      );

      toast.success("Login successful 🎉");
      setTimeout(() => navigate("/"), 1200);
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
      toast.success("OTP resent successfully");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 text-center">

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            OTP Verification
          </h2>

          <p className="text-sm text-gray-500 mb-8">
            Enter the 6-digit OTP sent to <br />
            <span className="font-medium text-gray-800">{email}</span>
          </p>

          {/* FORM */}
          <form onSubmit={verifyOtp} className="space-y-6">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter OTP"
              required
              className="
                w-full text-center tracking-[0.6em] text-lg
                border-b-2 border-gray-300 py-4
                outline-none focus:border-purple-600
                placeholder-gray-400
              "
            />

            <button
              type="submit"
              className="
                w-full py-4 rounded-full
                bg-gradient-to-r from-purple-600 to-pink-500
                text-white font-semibold text-lg
                shadow-lg hover:opacity-90 transition
              "
            >
              Verify OTP
            </button>
          </form>

          {/* RESEND */}
          <button
            onClick={resendOtp}
            disabled={loading}
            className="
              mt-6 text-sm font-medium
              text-purple-600 hover:underline
              disabled:text-gray-400
            "
          >
            {loading ? "Sending OTP..." : "Resend OTP"}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
}

export default Code;
