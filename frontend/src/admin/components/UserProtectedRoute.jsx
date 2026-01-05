import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../axiosConfig.js";

function UserProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      // Backend call to verify user token & role
      await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });
      setAllowed(true);
    } catch (error) {
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h2>Checking user access...</h2>;

  if (!allowed) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default UserProtectedRoute;
