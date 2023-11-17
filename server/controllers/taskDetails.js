import { pool } from '../config/database.js'

// get tasks by board
// const getTasksByBoard = async (req, res) => {
//     const board_id = req.params.id
//     try {
//       const results = await pool.query(`SELECT * FROM tasks WHERE board_id = ${board_id}`)
//       res.status(200).json(results.rows)
//     } catch (error) {
//       res.status(400).json( { error: error.message } )
//     }
//   }

// get tasks by date (this is only used in the context of a board. Board and date info will 
// come from url)
const getTasksByDate = async (req, res) => {
    const board_id = req.params.board_id
    const date = req.params.date
    console.log(date)
    try {
      const results = await pool.query('SELECT * FROM tasks WHERE task_date = $1 AND board_id = $2',
      [date, board_id])
      res.status(200).json(results.rows)
      console.log("query worked")
    } catch (error) {
      res.status(400).json( { error: error.message } )
      console.log("query didnt worked")
    }
  }


// get task by id
const getTaskById = async (req, res) => {
    const task_id = req.params.task_id
    try {
      const results = await pool.query(`SELECT * FROM tasks WHERE task_id = ${task_id}`)
      res.status(200).json(results.rows)
    } catch (error) {
      res.status(400).json( { error: error.message } )
    }
  }

// create new task
const createTask = async (req, res) => {
    try {
      console.log("inside create task controller")
      const { board, creator, assignee, description, priority, status, start_time, end_time, date } = req.body
      const results = await pool.query(
        `INSERT INTO tasks (board_id, task_creator_id, task_assignee_id, task_description, task_priority, task_status, task_start_time, task_end_time, task_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
         [board, creator, assignee, description, priority, status, start_time, end_time, date]
        )
      res.status(200).json(results.rows) 
    } catch (error) {
      res.status(400).json( { error: error.message } )
    }
  }

  // update a task
  const updateTask = async (req, res) => {
    try {
      console.log("inside update task controller")
      const task_id = req.params.task_id
      const { board, assignee, description, priority, status, start_time, end_time, date } = req.body
      console.log(board)
      console.log(assignee)
      console.log(description)
      console.log(priority)
      console.log(status)
      console.log(start_time)
      console.log(end_time)
      console.log(date)
      console.log(task_id)
      const results = await pool.query(
        `UPDATE tasks 
        SET board_id = $1, task_assignee_id = $2, task_description = $3, task_priority = $4, task_status = $5, task_start_time = $6, task_end_time = $7, task_date = $8 
        WHERE task_id = $9`,
         [board, assignee, description, priority, status, start_time, end_time, date, task_id]
        )
      res.status(201).json(results.rows) 
    } catch (error) {
      res.status(400).json( { error: error.message } )
    }
  }

  // delete a task
  const deleteTask = async (req, res) => {
    try {
        const task_id = req.params.task_id
        const results = await pool.query('DELETE FROM tasks WHERE task_id = $1', [task_id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
  }

export default{
    // tasksByBoard: getTasksByBoard,
    tasksByDate: getTasksByDate,
    taskById: getTaskById, 
    create: createTask,
    update: updateTask,
    delete: deleteTask
}