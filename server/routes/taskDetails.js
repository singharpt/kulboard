import express from "express"
import TaskDetailsController from "../controllers/taskDetails.js"

const router = express.Router()

router.get("/board/:board_id/:date", TaskDetailsController.tasksByDate)
//router.get("/board/:board_id/:date/task_id", TaskDetailsController.getTasksByTaskId);
router.get("/task/task_id", TaskDetailsController.taskById)

router.post("/tasks", TaskDetailsController.create)
router.patch('/task/:task_id', TaskDetailsController.update)
router.delete('/task/:task_id', TaskDetailsController.delete)

export default router
