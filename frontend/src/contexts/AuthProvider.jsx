import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig.js";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  // ✅ Check if user or admin is logged in
  async function checkIsLoggedIn() {
    try {
      const response = await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setLoggedinUser(response.data.user || null); // <-- set user info with role
      }
    } catch (err) {
      setIsLoggedIn(false);
      setLoggedinUser(null);
    }
  }

  // ✅ Logout for both user/admin
  async function handleLogout() {
    try {
      // Try user logout
      let url = "/user/logout";

      // If logged-in user is admin, logout via admin route
      if (loggedinUser?.role === "admin") url = "/admin/logout";

      const response = await instance.post(url, {}, { withCredentials: true });

      if (response.status === 200) {
        setIsLoggedIn(false);
        setLoggedinUser(null);
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <authContext.Provider
      value={{ isLoggedIn, loggedinUser, checkIsLoggedIn, handleLogout, setIsLoggedIn, setLoggedinUser }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
