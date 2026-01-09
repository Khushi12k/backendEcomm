import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../axiosConfig";

function ProtectedRouters() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // ✅ Send cookie along with request
        await instance.get("/admin/check/login", { withCredentials: true });
        setAllowed(true);
      } catch (err) {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) return <h2>Checking admin access...</h2>;
  if (!allowed) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}

export default ProtectedRouters;

