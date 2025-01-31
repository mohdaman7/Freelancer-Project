import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // Get the token from headers
    if (!authHeader) {
      return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
      return res.status(403).json({ message: "Invalid token format." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized. Token is invalid or expired." });
      }

      // Attach user data to request object
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role, // Add role-based access control if needed
      };

      next(); // Pass control to next middleware/controller
    });
  } catch (error) {
    console.error("JWT Authentication Error:", error);
    return res.status(500).json({ message: "Server error during authentication" });
  }
};
