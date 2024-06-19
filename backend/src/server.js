import express from "express";
import cors from "cors";

import("dotenv/config.js");
import db from "../config/db.config.js";

import authRoutes from "./routes/auth.js";
import projectsRoutes from "./routes/projects.js";
import tasksRoutes from "./routes/tasks.js";

const app = express();

db.connect(app);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectsRoutes);
app.use("/projects", tasksRoutes);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
