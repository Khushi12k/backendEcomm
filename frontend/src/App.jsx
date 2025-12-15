import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthProvider";
import AdminHome from "./admin/pages/Home";
import AdminLogin from "./admin/pages/Login";
import AddProduct from "./admin/pages/AddProduct";
import ProtectedRouters from "./admin/components/ProtectedRouters.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // { path: "AdminLogin", element: <AdminLogin /> },
      { path: "admin/login", element: <AdminLogin /> },

      { path: "admin/home", element: <AdminHome /> },

      {
        path: "admin/AddProduct",
        element: <AddProduct />
      },

      {
        path: "admin/product/add",
        element: (
          <ProtectedRouters>
            <AddProduct />
          </ProtectedRouters>
        )
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;