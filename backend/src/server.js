import express from "express";
import cors from "cors";

import("dotenv/config.js");
import db from "../config/db.config.js";

import authRoutes from "./routes/auth.js";
import projects from "./routes/projects.js";

const app = express();

db.connect(app);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projects);

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
