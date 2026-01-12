import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./contexts/AuthProvider.jsx";
import { CartProvider } from "./contexts/CartProvider.jsx";
import { LoaderProvider } from "./contexts/LoaderContext.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Code from "./pages/Code.jsx"; // ✅ OTP PAGE
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";

import AdminHome from "./admin/pages/Home.jsx";
import AdminLogin from "./admin/pages/Login.jsx";
import AddProduct from "./admin/pages/AddProduct.jsx";
import Coupon from "./admin/pages/Coupon.jsx";
import AddCoupon from "./admin/pages/AllCoupons.jsx";
import ProductList from "./admin/pages/ProductList.jsx";
import AdminUsers from "./admin/pages/AdminUsers.jsx";
import ProtectedRouters from "./admin/components/ProtectedRouters.jsx";
import Categories from "./admin/pages/Categories.jsx";

/* ===== USER LAYOUT ===== */
function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

/* ===== ADMIN LAYOUT ===== */
function AdminLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      /* ===== USER ROUTES ===== */
      {
        element: <UserLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },

          // ✅ LOGIN OTP PAGE
          { path: "login-code", element: <Code /> },

          { path: "product/:slug", element: <SingleProduct /> },
          { path: "cart", element: <Cart /> },
        ],
      },

      /* ===== ADMIN LOGIN ===== */
      {
        element: <AdminLayout />,
        children: [{ path: "admin/login", element: <AdminLogin /> }],
      },

      /* ===== ADMIN PROTECTED ROUTES ===== */
      {
        path: "admin",
        element: <ProtectedRouters />,
        children: [
          { index: true, element: <AdminHome /> },
          { path: "home", element: <AdminHome /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "coupons", element: <Coupon /> },
          { path: "add-coupon", element: <AddCoupon /> },
          { path: "product-list", element: <ProductList /> },
          { path: "users", element: <AdminUsers /> },
          { path: "categories", element: <Categories /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LoaderProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} />
        </LoaderProvider>
      </CartProvider>
    </AuthProvider>
  );
}






