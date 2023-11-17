import useFetch from "../utilities/useFetch";

const addBoardMembers = async (board_name, member_id) => {
  const request = {
    URL: "http://localhost:3000/api/board/add/memberId",
    METHOD: "POST",
    BODY: {
      board_id: board_name,
      board_member_id: member_id,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  console.log("add board member response ", response);
  return "board member updated successfully";
};

const removeBoardMembers = async (board_name, member_id) => {
  const request = {
    URL: "http://localhost:3000/api/board/remove/memberId",
    METHOD: "POST",
    BODY: {
      board_id: board_name,
      board_member_id: member_id,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  console.log("delete board member response ", response);
  return "board member deleted successfully";
};

export default { addBoardMembers, removeBoardMembers };
