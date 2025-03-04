import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const authenticateUser = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(403).json({ message: "Access denied. No token provided." });
      }

      console.log(authHeader,'tokennn')
      
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Invalid token format." });
      }


      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized. Token is invalid or expired." });
        }

        
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role, 
        };

      
        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied. You do not have permission to access this resource." });
        }

        next(); 
      }); 
    } catch (error) {
      console.error("JWT Authentication Error:", error);
      return res.status(500).json({ message: "Server error during authentication" });
    }
  };
};