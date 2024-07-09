import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  getHello,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/user/:id", getUser);
userRouter.get("/hello", getHello);

export default userRouter;
