import jwt from "jsonwebtoken";
import "dotenv/config";

export function checkForlogin(req, res, next, customArg) {
  try {
    const referer = customArg || req.query.referer;

    if (!referer) {
      return res.status(401).json({ message: "Access denied" });
    }

    const cookies = req.cookies || {};
    let token;

    // ✅ role based token
    if (referer === "admin") token = cookies.admin_token;
    if (referer === "user") token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ role check
    if (decoded.role !== referer) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;

    if (next) return next();

    return res.status(200).json({
      message: "Logged in",
      role: decoded.role
    });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}





