import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const { isLoggedIn } = useAuth();

  // Fetch cart count from localStorage on component mount
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    navigate("/login");
  }

  return (
    <div className="header">
      <div className="logo">
        <h1>
          <Link to="/">E-commerce</Link>
        </h1>
      </div>

      <div className="list">
        <Link to="/cart" className="cart-link">
          Cart <FaCartPlus className="cartIcon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <Link to="/admin/Login">Admin</Link>

        {isLoggedIn ? (
          <span className="logoutIcon" onClick={handleLogout}>
            Logout <IoMdLogOut />
          </span>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;


