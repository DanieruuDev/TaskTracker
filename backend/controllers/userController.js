import User from "../model/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send({ message: "Email already exists" });
  }
  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ message: "Send all required fields: username, email, password" });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(JWT_SECRET);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = Jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
