import axios from "axios";

//const getTasksByDate = (board_id, date) => axios.get(`/api/board/${board_id}/${date}`)
const getTasksByDate = (board_id, date) =>
  axios.get(
    `https://kulboard-production.up.railway.app/api/board/${board_id}/${date}`
  );

const getTaskById = (task_id) =>
  axios.get(`https://kulboard-production.up.railway.app/api/task/${task_id}`);
const createTask = (task) =>
  axios.post("https://kulboard-production.up.railway.app/api/tasks", task);
const updateTask = (task_id, task) =>
  axios.patch(
    `https://kulboard-production.up.railway.app/api/task/${task_id}`,
    task
  );
const deleteTask = (task_id) =>
  axios.delete(
    `https://kulboard-production.up.railway.app/api/task/${task_id}`
  );

export default {
  // tasksByBoard: getTasksByBoard,
  tasksByDate: getTasksByDate,
  taskById: getTaskById,
  create: createTask,
  update: updateTask,
  delete: deleteTask,
};
