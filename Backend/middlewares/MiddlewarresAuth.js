// import jwt from "jsonwebtoken";
// import "dotenv/config";


// export async function checkForlogin(req, res, next, customArg) {
//   try {
//     // Determine referer (user/admin)
//     const referer = customArg || req.query.referer;
//     if (!referer) return res.status(401).json({ message: "Access denied" });

//     // Get cookies
//     const cookies = req.cookies || {};
//     let token;
//     if (referer === "admin") token = cookies.admin_token;
//     if (referer === "user") token = cookies.auth_token;

//     if (!token) return res.status(401).json({ message: "Not logged in" });

//     // Verify token using correct env variable
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Check role
//     if (decoded.role !== referer)
//       return res.status(403).json({ message: "Forbidden: Invalid role" });

//     // Attach userId to request
//     req.userId = decoded.id;
//     req.userRole = decoded.role;

//     // If next middleware exists, call it; else respond
//     if (typeof next === "function") {
//       return next();
//     } else {
//       return res.status(200).json({ message: "Logged in", user: decoded });
//     }
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }







import jwt from "jsonwebtoken";
import Auth from "../models/Authmodel.js"; // ✅ Correct model
import "dotenv/config";

export async function checkForlogin(req, res, next, customArg) {
  try {
    // Determine referer (user/admin)
    const referer = customArg || req.query.referer;
    if (!referer)
      return res.status(401).json({ message: "Access denied" });

    // Get cookies
    const cookies = req.cookies || {};
    let token;
    if (referer === "admin") token = cookies.admin_token;
    if (referer === "user") token = cookies.auth_token;

    if (!token)
      return res.status(401).json({ message: "Not logged in" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Role check
    if (decoded.role !== referer)
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid role" });

    /* ================= BLOCK CHECK ================= */
    if (decoded.role === "user") {
      const user = await Auth.findById(decoded.id); // ✅ fixed

      if (!user)
        return res.status(401).json({ message: "User not found" });

      if (user.isBlocked) {
        return res.status(403).json({
          message: "Your account has been blocked by admin"
        });
      }
    }
    /* ================================================= */

    // Attach data to request
    req.userId = decoded.id;
    req.userRole = decoded.role;

    // Call next middleware
    if (typeof next === "function") {
      return next();
    } else {
      return res
        .status(200)
        .json({ message: "Logged in", user: decoded });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token" });
  }
}


