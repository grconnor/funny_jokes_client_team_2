import axios from "axios";

const getJoke = async () => {
  let response = await axios.get("/jokes");
  return response.data.jokes;
};

const saveJoke = async (joke_id, content) => {
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
      { joke_id, content },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    alert("Sorry, something happened and we were not able to save that joke!");
    return false;
  }
};

export { getJoke, saveJoke };
