import Product from "../models/Productmodel.js";

// ================= ADD PRODUCT =================
export async function addProduct(req, res) {
    try {
        const newRecord = req.body;

        if (req.files && req.files.length > 0) {
            newRecord.images = req.files.map(file => `uploads/${file.filename}`);
        } else {
            return res.status(400).json({ message: "At least one image is required" });
        }

        const newProduct = new Product(newRecord);
        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("ADD PRODUCT ERROR 👉", error);
        return res.status(500).json({ message: error.message });
    }
}

// ================= GET PRODUCTS =================
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log("GET PRODUCTS ERROR 👉", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ================= UPDATE PRODUCT =================
export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const updatedRecord = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedRecord, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product Updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ================= DELETE PRODUCT =================
export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ================= CHECK SLUG =================
export async function checkSlug(req, res) {
    try {
        const { slug } = req.params;
        const matchingSlug = await Product.findOne({ slug });

        if (matchingSlug) return res.status(400).json({ message: "Slug already exists. Choose different" });
        return res.status(200).json({ message: "Slug is available" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// ================= GET PRODUCT BY SLUG =================
export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  


