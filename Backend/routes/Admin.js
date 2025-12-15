import { Router } from "express";
import { loginAdmin,logoutAdmin,updateAdmin } from "../controllers/AdminController.js";

const adminRouter=Router();
adminRouter.post("/login",loginAdmin)
adminRouter.post("/logout",logoutAdmin)
adminRouter.put("/:id",updateAdmin)

export default adminRouter;