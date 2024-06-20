import axios from "../lib/api";

export const getTask = async (id) => {
  return await axios.get(`projects/tasks/${id}`);
};

export const getTasks = async (projectId) => {
  return await axios.get(`projects/${projectId}/tasks`);
};

export const createTask = async (projectId, payload) => {
  return await axios.post(`projects/${projectId}/tasks`, payload);
};

export const editTask = async (id, payload) => {
  return await axios.put(`projects/tasks/${id}`, payload);
};

export const deleteTask = async (id) => {
  return await axios.delete(`projects/tasks/${id}`);
};
