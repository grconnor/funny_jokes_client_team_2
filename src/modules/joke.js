import axios from "axios";

const getJoke = async () => {
  let response = await axios.get("/jokeGetter");
  return response.data;
};

export { getJoke };
