import axios from "axios";

const getBoardById = (board_id) =>
  axios.get(`https://kulboard-production.up.railway.app/api/board/${board_id}`);
const getUsersByBoardId = (board_id) =>
  axios.get(
    `https://kulboard-production.up.railway.app/api/board/users/${board_id}`
  );

export default {
  getBoardById,
  getUsersByBoardId,
};
