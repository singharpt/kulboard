import useFetch from "../utilities/useFetch";

const updateBoardMembers = async (data) => {
  const request = {
    URL: "http://localhost:3000/api//board/add/member",
    METHOD: "POST",
    BODY: {
      board_id: data.board_name,
      board_member_email: data.member_email,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  console.log("update board memeber response ", response);
  return "board member updated successfully";
};

export default updateBoardMembers;
