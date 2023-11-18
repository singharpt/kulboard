import useFetch from "../utilities/useFetch";

const registerUser = async (data) => {
  const request = {
    URL: "https://kulboard-production.up.railway.app/api/register",
    METHOD: "POST",
    BODY: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    },
    HEADERS: {
      "Content-Type": "application/json",
    },
  };

  const response = await useFetch(request);
  if (response.length > 0) {
    return response[0];
  } else {
    console.log("Registration Failed:", response);
    return response;
  }
};

export default registerUser;
