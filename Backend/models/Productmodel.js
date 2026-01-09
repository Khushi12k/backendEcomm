import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    // ✅ CATEGORY SLUG ONLY (SINGLE FIELD)
    category: {
      type: String, // category slug store hoga
      required: true,
    },

    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },

    images: [{ type: String, required: true }],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/*
  ✅ Prevent OverwriteModelError
*/
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
