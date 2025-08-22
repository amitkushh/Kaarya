import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", getTasks);
taskRoutes.get("/task/:id", getTaskById);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
