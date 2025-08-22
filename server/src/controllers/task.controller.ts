import Task from "../models/task.models";
import type { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "yes" || completed === "true",
      owner: req.user.id,
    });

    await task.save();
    res.status(201).json({
      message: "Task Created Successfully",
      success: true,
      task,
    });
  } catch (error) {
    console.log("Error in creating task", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    if (!tasks) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log("Error in getting task", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("Error in getting task by id", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };

    if (data.completed != undefined) {
      data.completed = data.completed === "yes" || data.completed === "true";
    }
    const updated = await Task.findByIdAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Task not fount",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      task: updated,
    });
  } catch (error) {
    console.log("Error in updating task", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task deleted",
      success: false,
    });
  } catch (error) {
    console.log("Error in deleting Task", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
