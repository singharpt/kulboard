import axios from 'axios'

const getTasksByDate = (board_id, date) => axios.get(`/api/board/${board_id}/${date}`)
const getTaskById = (task_id) => axios.get(`/api//task/${task_id}`)
const createTask = () => axios.post('/api/tasks')
const updateTask = (task_id) => axios.patch(`/api/tasks/${task_id}`)
const deleteTask = (task_id) => axios.delete(`/api/tasks/${task_id}`)

export default{
    // tasksByBoard: getTasksByBoard,
    tasksByDate: getTasksByDate,
    taskById: getTaskById, 
    create: createTask,
    update: updateTask,
    delete: deleteTask
}