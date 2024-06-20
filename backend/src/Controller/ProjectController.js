import Project from "../models/Project.js";

export async function createProject(req, res) {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    const project = await Project.exists({ userId, name });
    if (project) {
      return res.status(400).json({
        message: "Project with this name already exists",
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

export async function getProject(req, res) {
  try {
    const id = req.params.projectId;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to get project" });
  }
}

export async function updateProject(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  const id = req.params.projectId;
  await Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found`,
        });
      } else {
        res.send({ message: "Project updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Failed to update project: ${err}`,
      });
    });
}

export async function deleteProject(req, res) {
  const id = req.params.projectId;
  await Project.findOneAndDelete({ _id: id }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Project not found.`,
        });
      } else {
        res.send({
          message: "Project deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Failed to delete project: ${err}`,
      });
    });
}
