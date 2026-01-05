import { Router } from "express";
import multer from "multer";
import { addProduct, deleteProduct, updateProduct, checkSlug, getProductBySlug, getProducts } from "../controllers/Product.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });
const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/add", upload.array("image", 5), addProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/checkSlug/:slug", checkSlug);
productRouter.get("/slug/:slug", getProductBySlug);

export default productRouter;

