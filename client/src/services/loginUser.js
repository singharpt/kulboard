import useFetch from "../utilities/useFetch";

const loginUser = async (data) => {
  const request = {
    URL: "http://localhost:3000/api/login",
    METHOD: "POST",
    BODY: {
      email: data.email,
      password: data.password,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  console.log("login response ", response);
  if (response.hasOwnProperty("name")) {
    return response;
  } else {
    console.error("Login Failed:", response);
    return {};
  }
};

export default loginUser;
