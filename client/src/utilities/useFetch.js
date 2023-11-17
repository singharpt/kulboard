import axios from "axios";
const useFetch = async (request) => {
  try {
    // for getting requests
    if (request.METHOD === "GET") {
      const response = await axios.get(request.URL, { withCredentials: true });
      return response;
    }

    // for posting requests
    if (request.METHOD === "POST") {
      const response = await axios.post(request.URL, request.BODY, {
        withCredentials: true,
      });
      if (response.status === 200) {
        return response.data;
      }
      return response;
    }

    // for delete request
    if (request.METHOD === "DELETE") {
      const response = await axios.delete(request.URL, {
        withCredentials: true,
        data: request.BODY, // Pass the data here
      });
      console.log("use fetch delete response", response);
      if (response.status === 200) {
        return response.data;
      }
      return response;
    }

    // for update requests
    if (request.METHOD === "PATCH" || request.METHOD === "PUT") {
      const response = await axios.patch(URL);
      return response.data;
    }
  } catch (err) {
    console.log("use fetch delete response", err);
    // console.error(err.message);
    return { error: err.message };
  }
};

export default useFetch;
