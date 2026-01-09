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

  // ✅ today's date (for blocking past dates)
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "code") {
      setForm({ ...form, code: value.toUpperCase() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.discount <= 0 || form.discount > 100) {
      toast.error("❌ Discount must be between 1 and 100");
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
      toast.error(error?.response?.data?.message || "❌ Failed to add coupon");
    }
  };

  return (
    <div className="admin-page">
      <h2>Add Coupon</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
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

        {/* ✅ Start Date - past blocked */}
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          min={today}
          required
        />

        {/* ✅ Expiry Date - startDate se pehle block */}
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          min={form.startDate || today}
          required
        />

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
