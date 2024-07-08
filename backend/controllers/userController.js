import User from "../model/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  console.log(req.body);
  if (existingUser) {
    console.log("Email already exist");
    return res.status(400).send({ message: "Email already exists" });
  }
  if (!username || !email || !password) {
    console.log("Missing required fields");
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
  console.log(req.body);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = Jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.find({ id });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getHello = async (req, res) => {
  return res.status(200).json({ message: "HELLO" });
};
