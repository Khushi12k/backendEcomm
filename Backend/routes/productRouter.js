import { Router } from "express";
import multer from "multer";
import { 
  addProduct, 
  deleteProduct, 
  updateProduct, 
  checkSlug, 
  getProductBySlug, 
  getProducts 
} from "../controllers/Product.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"), // temporary storage before Cloudinary upload
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });
const productRouter = Router();

// Routes
productRouter.get("/", getProducts);
productRouter.post("/add", upload.array("image", 5), addProduct); // add product with images
productRouter.put("/:id", upload.array("image", 5), updateProduct); // update product with optional new images
productRouter.delete("/:id", deleteProduct);
productRouter.get("/checkSlug/:slug", checkSlug);
productRouter.get("/slug/:slug", getProductBySlug);

export default productRouter;





