import Task from "../models/Task.js";

export async function createTask(req, res) {
  try {
    const userId = req.userId;
    const projectId = req.params.projectId;
    const { title, description, status } = req.body;
    const completedBy = status === "concluída" ? userId : null;
    const completedAt = status === "concluída" ? Date.now() : null;

    const task = await Task.exists({ userId, projectId, title });
    if (task) {
      return res.status(400).json({
        message: "Task with this title already exists in the project",
      });
    }

    const newTask = new Task({
      title,
      description,
      status,
      projectId,
      completedBy,
      completedAt,
    });
    await newTask.save();
    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
}

export async function listTasks(req, res) {
  try {
    const projectId = req.params.projectId;
    const data = await Task.find({ projectId: projectId }).exec();
    if (!data) {
      res.status(204).json({ message: "Cannot find any task for project" });
    }
    res.status(200).json({ results: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to list tasks for project" });
  }
}

export async function getTask(req, res) {
  try {
    const id = req.params.taskId;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to get task" });
  }
}

export async function updateTask(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: "Data to update can not be empty",
    });
  }

  const userId = req.userId;
  const id = req.params.taskId;
  const { status } = req.body;
  const completedBy = status === "concluída" ? userId : null;
  const completedAt = status === "concluída" ? Date.now() : null;
  req.body.completedBy = completedBy;
  req.body.completedAt = completedAt;
  await Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Task not found`,
        });
      } else {
        res.send({ message: "Task updated successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Failed to update task: ${err}`,
      });
    });
}

export async function deleteTask(req, res) {
  const id = req.params.taskId;

  await Task.findOneAndDelete(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Task not found.`,
        });
      } else {
        res.send({
          message: "Task deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: `Failed to delete task: ${err}`,
      });
    });
}
