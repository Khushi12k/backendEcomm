import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="admin-home">
      <h1>Admin Dashboard</h1>

      <div className="admin-actions">
        {/* Add Product */}
        <div
          className="admin-card"
          onClick={() => navigate("/admin/add-product")}
        >
          <h2>➕ Add Product</h2>
          <p>Add new products to your store</p>
        </div>

        {/* Add Coupon */}
        <div
          className="admin-card"
          onClick={() => navigate("/admin/coupons")}
        >
          <h2>🎟️ Add Coupon</h2>
          <p>Create & manage discount coupons</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
