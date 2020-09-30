import axios from "axios";

const getJoke = async () => {
  let currentJoke = await axios.get("/jokeGetter");
  return currentJoke.data;
};

export { getJoke };