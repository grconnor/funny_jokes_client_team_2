import axios from "axios";

const getJoke = async () => {
  let response = await axios.get("/jokes");
  return response.data.jokes;
};

export { getJoke };
