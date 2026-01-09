import Product from "../models/Productmodel.js";
import cloudinary from "../Config/cloudinary.js";
import fs from "fs";

/* ================= ADD PRODUCT ================= */
export async function addProduct(req, res) {
  try {
    const newRecord = req.body;

    // 🔒 Required fields check
    if (!newRecord.name || !newRecord.slug || !newRecord.category) {
      return res.status(400).json({
        message: "Name, slug and category are required",
      });
    }

    // 🔒 Slug unique check
    const slugExists = await Product.findOne({ slug: newRecord.slug });
    if (slugExists) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // 📤 Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      uploadedImages.push(result.secure_url);

      // 🧹 remove local file
      fs.unlinkSync(file.path);
    }

    newRecord.images = uploadedImages;

    const newProduct = new Product(newRecord);
    await newProduct.save();

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("ADD PRODUCT ERROR 👉", error);
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const filter = {};

    // ✅ category filter (slug)
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE PRODUCT ================= */
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedRecord = req.body;

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        uploadedImages.push(result.secure_url);
        fs.unlinkSync(file.path);
      }

      updatedRecord.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedRecord,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
}

/* ================= DELETE PRODUCT ================= */
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR 👉", error);
    res.status(500).json({ message: error.message });
  }
}

/* ================= CHECK SLUG ================= */
export async function checkSlug(req, res) {
  try {
    const { slug } = req.params;

    const matchingSlug = await Product.findOne({ slug });
    if (matchingSlug) {
      return res
        .status(400)
        .json({ message: "Slug already exists. Choose another" });
    }

    return res.status(200).json({ message: "Slug is available" });
  } catch (error) {
    console.error("CHECK SLUG ERROR 👉", error);
    return res.status(500).json({ message: error.message });
  }
}

/* ================= GET PRODUCT BY SLUG ================= */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("GET PRODUCT BY SLUG ERROR 👉", err);
    res.status(500).json({ message: err.message });
  }
};
