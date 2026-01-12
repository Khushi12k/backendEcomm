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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Coupon
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* COUPON CODE */}
          <input
            type="text"
            name="code"
            placeholder="Coupon Code (CAPITAL)"
            value={form.code}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl uppercase
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* DISCOUNT */}
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={form.discount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl
                       focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* START DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-4 py-3 border rounded-xl
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* EXPIRY DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              min={form.startDate || today}
              required
              className="w-full px-4 py-3 border rounded-xl
                         focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800
                       text-white font-semibold rounded-xl shadow-md
                       hover:scale-[1.03] hover:shadow-xl transition"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
