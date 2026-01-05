import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig.js";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function checkIsLoggedIn() {
    try {
      const response = await instance.get("/check/login?referer=user", {
        withCredentials: true,
      });
      if (response.status === 200) setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  }

  async function handleLogout() {
    try {
      const response = await instance.post(
        "/user/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <authContext.Provider
      value={{ isLoggedIn, loggedinUser, checkIsLoggedIn, handleLogout, setIsLoggedIn }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;




