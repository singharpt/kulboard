import axios from "axios";
const useFetch = async (request) => {
  try {
    if (request.METHOD === "GET") {
      const response = await axios.get(request.URL, { withCredentials: true });
      return response;
    }

    if (request.METHOD === "POST") {
      const response = await axios.post(request.URL, request.BODY);
      return response.data;
    }

    if (request.METHOD === "PATCH" || METHOD === "PUT") {
      const response = await axios.patch(URL);
      return response.data;
    }

    if (request.METHOD === "DELETE") {
      const response = await axios.delete(URL);
      return response.data;
    }
  } catch (err) {
    console.error(err.message);
    return { error: err.message };
  }
};

export default useFetch;
