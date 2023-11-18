import useFetch from "../utilities/useFetch";

const get_all_users = async () => {
  const request = {
    URL: "https://kulboard-production.up.railway.app/api/user",
    METHOD: "GET",
  };

  const response = await useFetch(request);
  if (response.status === 200) {
    return response.data;
  }
  console.error("Issue with authorization", response);
  return false;
};

export default get_all_users;
