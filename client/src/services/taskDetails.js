import axios from 'axios'

//const getTasksByDate = (board_id, date) => axios.get(`/api/board/${board_id}/${date}`)
const getTasksByDate = (board_id, date) => axios.get(`http://localhost:3000/api/board/${board_id}/${date}`);

const getTaskById = (task_id) => axios.get(`http://localhost:3000/api/task/${task_id}`)
const createTask = (task) => axios.post('http://localhost:3000/api/tasks', task)
const updateTask = (task_id, task) => axios.patch(`http://localhost:3000/api/task/${task_id}`, task)               
const deleteTask = (task_id) => axios.delete(`http://localhost:3000/api/task/${task_id}`)

export default{
    // tasksByBoard: getTasksByBoard,
    tasksByDate: getTasksByDate,
    taskById: getTaskById, 
    create: createTask,
    update: updateTask,
    delete: deleteTask
}