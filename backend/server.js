import connectDB from "./utils/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => res.status(200).json({ message: "HELLO" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.use("/users", userRouter);
    app.use("/tasks", taskRouter);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
