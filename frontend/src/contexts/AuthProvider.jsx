// import { createContext, useContext, useEffect, useState } from "react";
// import instance from "../axiosConfig";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkLogin = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setIsLoggedIn(false);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await instance.get("/auth/check", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsLoggedIn(res.data.loggedIn);
//     } catch (err) {
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     const res = await instance.post("/user/login", { email, password });
//     if (res.data.token) {
//       localStorage.setItem("token", res.data.token);
//       setIsLoggedIn(true);
//     }
//     return res;
//   };

//   const logout = async () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, checkLogin }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function checkIsLoggedIn() {
    const response = await instance.get("/check/login?referer=user", {
      withCredentials: true,
    });
    if (response.status === 200) setIsLoggedIn(true);
  }

  async function handleLogout() {
    const response = await instance.post(
      "/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      window.location.href = "/";
    }
  }

  return (
    <authContext.Provider
      value={{ isLoggedIn, loggedinUser, checkIsLoggedIn, handleLogout }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export default AuthProvider;
