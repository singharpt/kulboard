import useFetch from "../utilities/useFetch";

const checkUserLoggedIn = async () => {
  const request = {
    URL: "https://kulboard-production.up.railway.app/api/checkUserLoggedIn",
    METHOD: "GET",
  };

  const response = await useFetch(request);
  if (response.status === 200) {
    return response.data;
  } else {
    console.log("Invalid user:", response);
    return [];
  }
};

export default checkUserLoggedIn;
