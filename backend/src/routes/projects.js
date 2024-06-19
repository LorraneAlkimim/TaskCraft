import express from "express";

import verifyToken from "../middleware/authMiddleware.js";
import {
  createProject,
  listProjects,
} from "../Controller/ProjectController.js";

const router = express.Router();

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, listProjects);

export default router;
