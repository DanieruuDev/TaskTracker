import Task from "../model/Task.js";
import mongoose from "mongoose";
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  try {
    const newTask = new Task({
      title,
      description,
      user: req.user._id,
    });

    const task = await newTask.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
