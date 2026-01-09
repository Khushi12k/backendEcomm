import Router from "express";
import {
  getUsers,
  registerUser,
  loginUsers,
  verifyLoginOtp,
  resendLoginOtp,
  logoutUsers,
  deleteUsers,
  updateUsers,
} from "../controllers/AuthController.js";

import { googleLogin } from "../controllers/googleLogin.js";

const authRouter = Router();

/* ================= USERS ================= */
authRouter.get("/", getUsers);

/* ================= REGISTER ================= */
authRouter.post("/register", registerUser);

/* ================= LOGIN WITH OTP ================= */
/*
  1️⃣ POST /user/login              -> email + password (send OTP)
  2️⃣ POST /user/verify-login-otp   -> email + otp (login success)
  3️⃣ POST /user/resend-login-otp   -> email (resend OTP)
*/
authRouter.post("/login", loginUsers);
authRouter.post("/verify-login-otp", verifyLoginOtp);
authRouter.post("/resend-login-otp", resendLoginOtp);

/* ================= LOGOUT ================= */
authRouter.post("/logout", logoutUsers);

/* ================= USER CRUD ================= */
authRouter.delete("/:id", deleteUsers);
authRouter.put("/:id", updateUsers);

/* ================= GOOGLE LOGIN ================= */
authRouter.post("/google-login", googleLogin);

export default authRouter;



