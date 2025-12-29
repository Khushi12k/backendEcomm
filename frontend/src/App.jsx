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
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "/cart",element: <Cart />},
      { path: "register", element: <Register /> },
     { path: "product/:slug", element: <SingleProduct /> },
    
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




