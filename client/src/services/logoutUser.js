import useFetch from "../utilities/useFetch";

const logoutUser = async () => {
  const request = {
    URL: "https://kulboard-production.up.railway.app/api/logoutUser",
    METHOD: "GET",
  };

  const response = await useFetch(request);
  return response;
};

export default logoutUser;
