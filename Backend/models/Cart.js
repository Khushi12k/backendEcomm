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

    // ✅ FIX: quantity MUST be Number
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    // selected image (for product variants)
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
