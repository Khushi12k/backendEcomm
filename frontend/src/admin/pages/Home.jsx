// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaPlus,
//   FaTicketAlt,
//   FaUsers,
//   FaBoxOpen,
//   FaSignOutAlt,
// } from "react-icons/fa";

// export default function AdminHome() {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* ===== HEADER ===== */}
//       <header className="admin-header">
//         <h2 className="admin-logo">Admin Panel</h2>

//         <nav className="admin-nav">
//           <span onClick={() => navigate("/admin/home")}>
//             <FaBoxOpen /> Dashboard
//           </span>

//           {/* ✅ PRODUCT LIST (FIXED) */}
//           <span onClick={() => navigate("/admin/product-list")}>
//             <FaBoxOpen /> Products
//           </span>

//           {/* ✅ ALL COUPONS LIST */}
//           <span onClick={() => navigate("/admin/coupons")}>
//             <FaTicketAlt /> Coupons
//           </span>

//           {/* ✅ ADD COUPON */}
//           <span onClick={() => navigate("/admin/add-coupon")}>
//             <FaTicketAlt /> Add Coupon
//           </span>

//           <span onClick={() => navigate("/admin/add-product")}>
//             <FaPlus /> Add Product
//           </span>

//           <span onClick={() => navigate("/admin/users")}>
//             <FaUsers /> Users
//           </span>
//         </nav>

//         <div
//           className="logout-btn"
//           onClick={() => navigate("/admin/login")}
//         >
//           <FaSignOutAlt />
//         </div>
//       </header>

//       {/* ===== PAGE CONTENT ===== */}
//       <div className="admin-home">
//         <h1>Welcome to Admin Dashboard</h1>

//         <div className="admin-actions">
//           {/* ✅ PRODUCT LIST CARD */}
//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/product-list")}
//           >
//             <h2><FaBoxOpen /> Product List</h2>
//             <p>View, edit & delete products</p>
//           </div>

//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/add-product")}
//           >
//             <h2><FaPlus /> Add Product</h2>
//             <p>Add new products</p>
//           </div>

//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/coupons")}
//           >
//             <h2><FaTicketAlt />Add Coupon</h2>
//             <p>View all coupons</p>
//           </div>

//           <div
//             className="admin-card"
//             onClick={() => navigate("/admin/users")}
//           >
//             <h2><FaUsers /> Users List</h2>
//             <p>All registered users</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaTicketAlt,
  FaUsers,
  FaBoxOpen,
  FaSignOutAlt,
  FaList, // ✅ Categories icon
} from "react-icons/fa";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="admin-header">
        <h2 className="admin-logo">Admin Panel</h2>

        <nav className="admin-nav">
          <span onClick={() => navigate("/admin/home")}>
            <FaBoxOpen /> Dashboard
          </span>

          <span onClick={() => navigate("/admin/product-list")}>
            <FaBoxOpen /> Products
          </span>

          {/* ✅ CATEGORIES */}
          <span onClick={() => navigate("/admin/categories")}>
            <FaList /> Categories
          </span>

          <span onClick={() => navigate("/admin/coupons")}>
            <FaTicketAlt /> Coupons
          </span>

          <span onClick={() => navigate("/admin/add-coupon")}>
            <FaTicketAlt /> Add Coupon
          </span>

          <span onClick={() => navigate("/admin/add-product")}>
            <FaPlus /> Add Product
          </span>

          <span onClick={() => navigate("/admin/users")}>
            <FaUsers /> Users
          </span>
        </nav>

        <div
          className="logout-btn"
          onClick={() => navigate("/admin/login")}
        >
          <FaSignOutAlt />
        </div>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <div className="admin-home">
        <h1>Welcome to Admin Dashboard</h1>

        <div className="admin-actions">
          {/* PRODUCT LIST */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/product-list")}
          >
            <h2>
              <FaBoxOpen /> Product List
            </h2>
            <p>View, edit & delete products</p>
          </div>

          {/* ADD PRODUCT */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/add-product")}
          >
            <h2>
              <FaPlus /> Add Product
            </h2>
            <p>Add new products</p>
          </div>

          {/* ✅ CATEGORIES CARD */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/categories")}
          >
            <h2>
              <FaList /> Categories
            </h2>
            <p>Add & manage product categories</p>
          </div>

          {/* COUPONS */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/coupons")}
          >
            <h2>
              <FaTicketAlt /> Coupons
            </h2>
            <p>View all coupons</p>
          </div>

          {/* USERS */}
          <div
            className="admin-card"
            onClick={() => navigate("/admin/users")}
          >
            <h2>
              <FaUsers /> Users List
            </h2>
            <p>All registered users</p>
          </div>
        </div>
      </div>
    </>
  );
}
