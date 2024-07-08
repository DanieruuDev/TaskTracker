import express from "express";
import {
  createUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";
import authMiddleware from "../utils/auth.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user/:id", authMiddleware, getUser);

export default userRouter;
