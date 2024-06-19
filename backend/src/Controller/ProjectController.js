import Project from "../models/Project.js";

export async function createProject(req, res) {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    const project = await Project.exists({ userId, name });
    if (project) {
      return res.status(400).json({
        message: "Project with this name already exists.",
      });
    }

    const newProject = new Project({ name, description, userId });
    await newProject.save();
    return res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
}

export async function listProjects(req, res) {
  try {
    const userId = req.userId;
    const data = await Project.find({ userId: userId }).exec();
    if (!data) {
      res.status(204).json({ message: "Cannot find any project for user" });
    }
    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to list projects for use" });
  }
}
