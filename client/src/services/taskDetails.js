import axios from 'axios'

//const getTasksByDate = (board_id, date) => axios.get(`/api/board/${board_id}/${date}`)
const getTasksByDate = (board_id, date) => axios.get(`http://localhost:3000/api/board/${board_id}/${date}`);

const getTaskById = (task_id) => axios.get(`http://localhost:3000/api/task/${task_id}`)
const createTask = () => axios.post('/api/tasks')
const updateTask = (task_id) => axios.patch(`http://localhost:3000/api/tasks/${task_id}`)               
const deleteTask = (task_id) => axios.delete(`/api/tasks/${task_id}`)

export default{
    // tasksByBoard: getTasksByBoard,
    tasksByDate: getTasksByDate,
    taskById: getTaskById, 
    create: createTask,
    update: updateTask,
    delete: deleteTask
}