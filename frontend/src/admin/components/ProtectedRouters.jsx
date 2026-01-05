// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import instance from "../../axiosConfig";

// function ProtectedRouters() {
//   const [loading, setLoading] = useState(true);
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     checkAdmin();
//   }, []);

//   async function checkAdmin() {
//     try {
//       await instance.get("/check/login?referer=admin", {
//         withCredentials: true,
//       });

//       setAllowed(true);
//     } catch (error) {
//       setAllowed(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <h2>Checking admin access...</h2>;

//   if (!allowed) return <Navigate to="/admin/login" replace />;

//   return <Outlet />;
// }

// export default ProtectedRouters;




import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import instance from "../../axiosConfig";

function ProtectedRouters() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      await instance.get("/check/login?referer=admin", {
        withCredentials: true,
      });
      setAllowed(true);
    } catch (error) {
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h2>Checking admin access...</h2>;

  if (!allowed) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}

export default ProtectedRouters;





// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import instance from "../../axiosConfig.js"; // ✅ use instance

// function ProtectedRouters() {
//   const [loading, setLoading] = useState(true);
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     checkForLogin();
//   }, []);

//   async function checkForLogin() {
//     try {
//       const response = await instance.get("/check/login?referer=admin"); 
//       console.log("Admin verified", response.data);
//       setAllowed(true);
//     } catch (error) {
//       console.log("Admin not authorized", error.response?.data);
//       setAllowed(false);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) return <h2>Checking admin access...</h2>;
//   if (!allowed) return <Navigate to="/admin/login" />;

//   return <Outlet />;
// }

// export default ProtectedRouters;
