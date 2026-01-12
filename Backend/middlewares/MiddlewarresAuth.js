import jwt from "jsonwebtoken";
import "dotenv/config";

export function checkForlogin(req, res, next, customArg) {
  try {
    console.log("=== AUTH MIDDLEWARE HIT ===");

    const referer = customArg || req.query.referer;
    console.log("Referer:", referer);

    if (!referer) {
      console.log("❌ No referer provided");
      return res.status(401).json({ message: "Access denied" });
    }

    const cookies = req.cookies || {};
    console.log("Cookies:", cookies);

    let token;

    // ✅ role based token
    if (referer === "admin") token = cookies.admin_token;
    if (referer === "user") token = cookies.auth_token;

    console.log("Selected Token:", token ? "FOUND" : "NOT FOUND");

    if (!token) {
      console.log("❌ Token missing");
      return res.status(401).json({ message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // ✅ role check
    if (decoded.role !== referer) {
      console.log("❌ Role mismatch:", decoded.role, "!=", referer);
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;

    console.log("✅ Auth Success");
    console.log("User ID:", req.userId);
    console.log("User Role:", req.userRole);

    if (next) return next();

    return res.status(200).json({
      message: "Logged in",
      role: decoded.role
    });

  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
