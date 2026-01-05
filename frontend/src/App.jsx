import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import ProductList from "./admin/pages/ProductList.jsx";

import { LoaderProvider } from "./contexts/LoaderContext.jsx";
import AdminUsers from "./admin/pages/AdminUsers.jsx";

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

      { path: "admin/login", element: <AdminLogin /> },
      { path: "/admin/product-list", element: <ProductList /> },
      { path: "/admin/users", element: <AdminUsers /> },

      {
        path: "admin",
        element: <ProtectedRouters />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "home", element: <AdminHome /> },
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
        <LoaderProvider>
          <RouterProvider router={router} />

          {/* ✅ GLOBAL TOAST CONTAINER */}
          <ToastContainer position="top-right" autoClose={3000} />
        </LoaderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;




