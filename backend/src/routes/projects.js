import express from "express";

import verifyToken from "../middleware/authMiddleware.js";
import {
  createProject,
  getProject,
  listProjects,
  updateProject,
  deleteProject,
} from "../Controller/ProjectController.js";

const router = express.Router();

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, listProjects);
router.get("/:projectId", verifyToken, getProject);
router.put("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);

export default router;
