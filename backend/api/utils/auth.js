// middleware/auth.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(userId).select("_id");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
