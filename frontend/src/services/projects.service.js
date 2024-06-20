import axios from "../lib/api";

export const getProject = async (id) => {
  return await axios.get(`/projects/${id}`);
};

export const getProjects = async () => {
  return await axios.get("/projects");
};

export const createProject = async (payload) => {
  return await axios.post("/projects", payload);
};

export const editProject = async (id, payload) => {
  return await axios.put(`/projects/${id}`, payload);
};

export const deleteProject = async (id) => {
  return await axios.delete(`/projects/${id}`);
};
