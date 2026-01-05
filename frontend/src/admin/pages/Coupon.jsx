import React, { useState } from "react";
import instance from "../../axiosConfig";
import { toast } from "react-toastify";

const AddCoupon = () => {
  const [form, setForm] = useState({
    code: "",
    discount: "",
    startDate: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* ===== CAPITAL LETTER VALIDATION ===== */
    if (form.code !== form.code.toUpperCase()) {
      toast.error("❌ Coupon code must be in CAPITAL letters");
      return;
    }

    /* ===== DATE VALIDATIONS ===== */
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(form.startDate);
    const expiryDate = new Date(form.expiryDate);

    if (startDate < today) {
      toast.error("❌ Start date cannot be before today");
      return;
    }

    if (expiryDate < startDate) {
      toast.error("❌ Expiry date must be after start date");
      return;
    }

    try {
      await instance.post("/coupon/add", form);
      toast.success("✅ Coupon added successfully");

      setForm({
        code: "",
        discount: "",
        startDate: "",
        expiryDate: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to add coupon");
    }
  };

  return (
    <div className="admin-page">
      <h2>Add Coupon</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code (CAPITAL)"
          value={form.code}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={form.discount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
