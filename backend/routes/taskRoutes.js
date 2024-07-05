import express from "express";
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import authMiddleware from "../utils/auth.js";
const taskRouter = express.Router();
taskRouter.use(authMiddleware);

taskRouter.post("/createTask", createTask);
taskRouter.get("/getTask", getTask);
taskRouter.patch("/updateTask/:id", updateTask);
taskRouter.delete("/deleteTask/:id", deleteTask);
export default taskRouter;
