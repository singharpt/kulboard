import useFetch from "../utilities/useFetch";

const validateUser = async (email) => {
  const request = {
    URL: "http://localhost:3000/api/checkUser",
    METHOD: "POST",
    BODY: { email },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  if (response.validUser) {
    return true;
  } else {
    console.log("Invalid user:", response);
    return false;
  }
};

export default validateUser;
