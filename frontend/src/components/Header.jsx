import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";

function Header() {
  const { isLoggedIn, loggedinUser, handleLogout } = useAuth();
  const { cartItems } = useCart();

  // ✅ Hide header for admin
  if (loggedinUser?.role === "admin") return null;

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between bg-[#0d6efd] px-16 py-3 text-white shadow-md">
      
      {/* ===== Logo ===== */}
      <div className="logo">
        <h1 className="pt-5 text-[1.8rem] font-bold tracking-wide">
          <Link
            to="/"
            className="text-white no-underline"
          >
            E-commerce
          </Link>
        </h1>
      </div>

      {/* ===== Right Menu ===== */}
      <div className="flex items-center gap-5">
        
        {/* ===== Cart ===== */}
        <Link
          to="/cart"
          className="relative inline-flex items-center gap-1.5 font-bold text-white transition-colors duration-300 hover:text-yellow-400"
        >
          <FaCartPlus className="text-[22px]" />
          <span>Cart</span>

          {/* Cart badge */}
          <span className="absolute -top-3 right-2 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#ff3b3b] text-[12px] font-bold text-white">
            {cartItems.length}
          </span>
        </Link>

        {/* ===== Auth ===== */}
        {isLoggedIn ? (
          <span
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-1.5 font-bold text-white transition-colors duration-300 hover:text-yellow-400"
          >
            Logout <IoMdLogOut />
          </span>
        ) : (
          <>
            <Link
              to="/login"
              className="font-bold text-white transition-colors duration-300 hover:text-yellow-400"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-bold text-white transition-colors duration-300 hover:text-yellow-400"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
