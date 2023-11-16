import axios from "axios";

const getBoardById = (board_id) => axios.get(`http://localhost:3000/api/board/${board_id}`)
const getUsersByBoardId = (board_id) => axios.get(`http://localhost:3000/api/board/users/${board_id}`) 

export default {
  getBoardById,
  getUsersByBoardId,
};
