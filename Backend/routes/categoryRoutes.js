import { Router } from "express";
import { addCategory, getCategories } from "../controllers/CategoryController.js";

const categoryRouter = Router();

categoryRouter.post("/add", addCategory);
categoryRouter.get("/", getCategories);

export default categoryRouter;
