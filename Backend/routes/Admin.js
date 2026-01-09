import { Router } from "express";
import { loginAdmin, logoutAdmin, checkAdminLogin, getAllUsers, blockUser, deleteUser } from "../controllers/AdminController.js";
import { checkForlogin } from "../middlewares/MiddlewarresAuth.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);

// ✅ New route to check admin login for ProtectedRouters
adminRouter.get("/check/login", checkAdminLogin);

// Protected routes
adminRouter.get("/users", (req, res, next) => checkForlogin(req, res, next, "admin"), getAllUsers);
adminRouter.put("/users/block/:id", (req, res, next) => checkForlogin(req, res, next, "admin"), blockUser);
adminRouter.delete("/users/:id", (req, res, next) => checkForlogin(req, res, next, "admin"), deleteUser);

export default adminRouter;
