import axios from "axios";

const getUserById = (user_id) =>
  axios.get(`https://kulboard-production.up.railway.app/api/user/${user_id}`);

export default {
  getUserById,
};
