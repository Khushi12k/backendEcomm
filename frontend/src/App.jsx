import { createBrowserRouter, RouterProvider } from "react-router-dom";
import First from "./pages/First.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

import AdminHome from "./admin/pages/Home.jsx";
import AdminLogin from "./admin/pages/Login.jsx";
import AddProduct from "./admin/pages/AddProduct.jsx";
import Coupon from "./admin/pages/Coupon.jsx";
import ProtectedRouters from "./admin/components/ProtectedRouters.jsx";

import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider } from "./contexts/CartProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:slug", element: <SingleProduct /> },
      { path: "cart", element: <Cart /> },

      /* ===== ADMIN LOGIN ===== */
      { path: "admin/login", element: <AdminLogin /> },

      /* ===== ADMIN PROTECTED ROUTES ===== */
      {
        path: "admin",
        element: <ProtectedRouters />,
        children: [
          { index: true, element: <AdminHome /> },   // /admin
          { path: "home", element: <AdminHome /> },  // /admin/home
          { path: "add-product", element: <AddProduct /> },
          { path: "coupons", element: <Coupon /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
