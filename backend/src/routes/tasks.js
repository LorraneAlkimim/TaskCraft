import express from "express";

import verifyToken from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "../Controller/TaskController.js";

const router = express.Router();

router.post("/:projectId/tasks", verifyToken, createTask);
router.get("/:projectId/tasks", verifyToken, listTasks);
router.get("/tasks/:taskId", verifyToken, getTask);
router.put("/tasks/:taskId", verifyToken, updateTask);
router.delete("/tasks/:taskId", verifyToken, deleteTask);

export default router;
