import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouters() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkForLogin();
  }, []);

  async function checkForLogin() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/check/login?referer=admin`,
        { withCredentials: true }
      );

      console.log("Admin verified", response.data);
      setAllowed(true);
    } catch (error) {
      console.log("Admin not authorized");
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }

  // ⏳ jab tak backend check ho raha
  if (loading) return <h2>Checking admin access...</h2>;

  // ❌ admin nahi hai
  if (!allowed) return <Navigate to="/admin/login" />;

  // ✅ VERY IMPORTANT
  return <Outlet />;
}

export default ProtectedRouters;
