import Category from "../models/Category.js";

/* ================= ADD CATEGORY ================= */
export async function addCategory(req, res) {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name & slug required" });
    }

    const exist = await Category.findOne({ slug });
    if (exist) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================= GET CATEGORIES ================= */
export async function getCategories(req, res) {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
