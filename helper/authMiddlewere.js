// helper/authMiddlewere.js
import jwt from "jsonwebtoken";

export async function authenticateUser(token) {
  try {
    if (!token) {
      // No token provided
      return null;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Return user info (e.g., _id, email, etc.)
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}
