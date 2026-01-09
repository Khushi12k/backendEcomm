import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";

function Header() {
  const { isLoggedIn, loggedinUser, handleLogout } = useAuth();
  const { cartItems } = useCart();

  // ✅ If admin is logged in, hide the header completely
  if (loggedinUser?.role === "admin") return null;

  return (
    <div className="header">
      <div className="logo">
        <h1>
          <Link to="/">E-commerce</Link>
        </h1>
      </div>

      <div className="list">
        <Link to="/cart" className="cart-link">
          <FaCartPlus className="cartIcon" />
          <span className="cart-text">Cart</span>
          <span className="cart-badge">{cartItems.length}</span>
        </Link>

        

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






