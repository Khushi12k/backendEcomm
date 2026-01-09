import Auth from "../models/Authmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* ================= ADMIN LOGIN ================= */
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Not an admin" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Fix for localhost
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // must be false on localhost
      sameSite: "lax", 
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ================= CHECK ADMIN LOGIN ================= */
export async function checkAdminLogin(req, res) {
  try {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ message: "Admin verified" });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

/* ================= ADMIN LOGOUT ================= */
export async function logoutAdmin(req, res) {
  res.clearCookie("admin_token");
  res.status(200).json({ message: "Logout successful" });
}

/* ================= GET ALL USERS ================= */
export async function getAllUsers(req, res) {
  try {
    const users = await Auth.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Block/Unblock User
export async function blockUser(req, res) {
  try {
    const { id } = req.params;
    const user = await Auth.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({ message: user.isBlocked ? "User blocked" : "User unblocked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete User
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await Auth.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
