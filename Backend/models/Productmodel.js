import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    images: [{ type: String, required: true }], // array of images
    status: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;


