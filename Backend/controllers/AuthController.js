import Auth from "../models/Authmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendgrid.js";

/* ================== GET USERS ================== */
export async function getUsers(req, res) {
  try {
    const users = await Auth.find().select(
      "-password -emailOtp -otpExpiry"
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== REGISTER ================== */
export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (await Auth.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    await Auth.create({
      name,
      email,
      password: hash,
      authProvider: "local",
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== LOGIN ================== */
export async function loginUsers(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.password)
      return res.status(400).json({ message: "Use Google login" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    /* ✅ ALREADY VERIFIED → DIRECT LOGIN */
    if (user.isOtpVerified) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ otpRequired: false });
    }

    /* ❌ FIRST LOGIN → SEND OTP */
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Login OTP",
      html: `<h2>${otp}</h2><p>Valid for 5 minutes</p>`,
    });

    res.json({ otpRequired: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== VERIFY LOGIN OTP ================== */
export async function verifyLoginOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.emailOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.emailOtp = null;
    user.otpExpiry = null;
    user.isOtpVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== RESEND LOGIN OTP ================== */
export async function resendLoginOtp(req, res) {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: email,
      subject: "Resend Login OTP",
      html: `<h2>${otp}</h2><p>Valid for 5 minutes</p>`,
    });

    res.json({ message: "OTP resent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== LOGOUT ================== */
export async function logoutUsers(req, res) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  res.json({ message: "Logout successful" });
}

/* ================== DELETE USER ================== */
export async function deleteUsers(req, res) {
  try {
    await Auth.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/* ================== UPDATE USER ================== */
export async function updateUsers(req, res) {
  try {
    const user = await Auth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
