import axios from "axios";

const getJoke = async () => {
  let response = await axios.get("/joke");
  return response.data;
};

export { getJoke };
