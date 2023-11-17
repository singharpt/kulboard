import useFetch from "../utilities/useFetch";

const logoutUser = async () => {
  const request = {
    URL: "http://localhost:3000/api/logoutUser",
    METHOD: "GET",
  };

  const response = await useFetch(request);
  return response;
};

export default logoutUser;
