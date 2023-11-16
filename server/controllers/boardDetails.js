import { pool } from "../config/database.js";

// get board information
const getBoardByBoardId = async (req, res) => {
  try {
    const id = req.params.board_id;
    const selectQuery = `
      SELECT boards.*
      FROM boards
      WHERE boards.board_id = ${id};
      `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get board information by board name
const getBoardByBoardName = async (req, res) => {
  try {
    const id = req.params.board_name;
    const selectQuery = `
      SELECT boards.*
      FROM boards
      WHERE boards.board_name = $1`;
    const results = await pool.query(selectQuery, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get board associated users (all the users associated with a board)
const getUsersByBoardId = async (req, res) => {
  try {
    const id = req.params.board_id;
    const selectQuery = `
      SELECT users.*
      FROM users
      LEFT JOIN board_members ON users.user_id = board_members.board_member_id
      LEFT JOIN boards ON board_members.board_id = boards.board_id
      WHERE boards.board_id = ${id}
      
      UNION
      
      SELECT users.*
      FROM users
      JOIN boards ON users.user_id = boards.board_owner_id
      WHERE boards.board_id = ${id};
      `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get board associated tasks (all the tasks associated with a board)
const getTasksByBoardId = async (req, res) => {
  try {
    const id = req.params.board_id;
    const selectQuery = `
      SELECT tasks.*
        FROM tasks
        WHERE tasks.board_id = ${id};
      `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get all boards a user is member at
const getBoardsByMemberId = async (req, res) => {
  try {
    const id = req.params.board_member_id;
    const selectQuery = `
      SELECT b.board_name, bm.board_id
      FROM board_members bm
      LEFT JOIN boards b
      on bm.board_id = b.board_id
      WHERE bm.board_member_id = ${id};
      `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get all boards user is owner of
const getBoardsByOwnerId = async (req, res) => {
  try {
    const id = req.params.board_owner_id;
    const selectQuery = `
      SELECT *
        FROM boards
        WHERE boards.board_owner_id = ${id};
      `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// add a new board
const addNewBoard = async (req, res) => {
  try {
    const { board_name, board_owner_id } = req.body;
    const board_name_result = await pool.query(
      `SELECT * 
        FROM boards 
        WHERE board_name=$1`,
      [board_name]
    );

    if (board_name_result.rows.length > 0) {
      return res.status(400).json("board name already exists");
    }

    const results = await pool.query(
      `INSERT INTO boards (board_owner_id, board_name) VALUES ($1, $2) RETURNING *`,
      [board_owner_id, board_name]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// add member to an existing board
const addBoardMembers = async (req, res) => {
  try {
    const { board_id, board_member_email } = req.body;
    const user = await pool.query(
      `SELECT user_id
        FROM users
        WHERE users.email=$1`,
      [board_member_email]
    );
    // console.log(user.rows[0]?.user_id);
    if (user.rows.length < 1) {
      return res.status(400).json("board member not a valid user in database");
    }
    const results = await pool.query(
      `INSERT INTO board_members (board_member_id, board_id) VALUES ($1, $2) RETURNING *`,
      [user.rows[0]?.user_id, board_id]
    );
    res.status(200).json(results.rows);
    // res.status(200).json(user.rows[0]?.user_id);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// get all boards
const getAllBoards = async (req, res) => {
  try {
    const results = await pool.query(`SELECT *
        FROM boards`);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// delete member from the board

// delete the board

// edit the board details

export default {
  getBoardByBoardName,
  getBoardByBoardId,
  getUsersByBoardId,
  getTasksByBoardId,
  getBoardsByMemberId,
  getBoardsByOwnerId,
  addNewBoard,
  addBoardMembers,
  getAllBoards,
};
