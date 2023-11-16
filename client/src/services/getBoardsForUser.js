import useFetch from "../utilities/useFetch";

const boards_user_is_owner = async (owner_id) => {
  const request = {
    URL: "http://localhost:3000/api/board/user/owner/" + owner_id,
    METHOD: "GET",
  };

  const response = await useFetch(request);
  //console.log(response);
  if (response.status === 200) {
    return response.data;
  }
  console.error("Issue with authorization", response);
  return false;
};

const boards_user_is_member = async (member_id) => {
  const request = {
    URL: "http://localhost:3000/api/board/user/member/" + member_id,
    METHOD: "GET",
  };

  const response = await useFetch(request);
  //console.log(response);
  if (response && response.length > 0) {
    return response.data;
  } else {
    console.error("No data available", response);
    return [];
  }
};

export default { boards_user_is_owner, boards_user_is_member };
