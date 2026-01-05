import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS (VERY IMPORTANT)
    selectedImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);
export default Cart;
