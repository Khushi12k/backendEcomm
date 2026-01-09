import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from  "../../axiosConfig.js"; // make sure this path is correct

export default function UserProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await instance.get("/check/login?referer=user", {
          withCredentials: true,
        });

        // ✅ Only allow access if role === "user"
        if (res.data.user?.role === "user") {
          setIsUser(true);
        } else {
          setIsUser(false); // admin cannot access user routes
        }
      } catch (err) {
        setIsUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Checking user access...
      </h2>
    );

  if (!isUser) return <Navigate to="/login" replace />;

  return <Outlet />;
}
