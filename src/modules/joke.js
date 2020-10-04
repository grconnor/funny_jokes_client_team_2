import axios from "axios";

const getJoke = async () => {
  let response = await axios.get("/jokes");
  return response.data.jokes;
};

const saveJoke = async (jokeId, jokeContent) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };
  try {
    let response = await axios.post(
      "/jokes",
      { jokeId, jokeContent },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    alert("Sorry, we were not able to save that joke!");
    return false;
  }
};



export { getJoke, saveJoke };

