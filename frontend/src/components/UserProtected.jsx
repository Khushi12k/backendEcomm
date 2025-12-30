// import { useAuth } from "../contexts/AuthProvider";
// import { Navigate } from "react-router-dom";

// const UserProtected = ({ children }) => {
//   const { isLoggedIn, loading } = useAuth();

//   if (loading) return <p>Checking login...</p>; // optional loading state
//   if (!isLoggedIn) return <Navigate to="/login" />; // redirect if not logged in

//   return children; // render children if logged in
// };

// export default UserProtected;
