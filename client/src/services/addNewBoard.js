import useFetch from "../utilities/useFetch";

const addNewBoard = async (board_name, user_id) => {
  const request = {
    URL: "http://localhost:3000/api/board/add",
    METHOD: "POST",
    BODY: {
      board_owner_id: user_id,
      board_name: board_name,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  if (response?.status === 400) {
    return { message: "board name already exists", status: false };
  }
  //console.log("add new board response ", response);
  return response;
};

export default addNewBoard;
