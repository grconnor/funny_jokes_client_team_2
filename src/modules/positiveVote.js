import axios from "axios";
const positiveVote = async (jokeId) => {
  let headers = sessionStorage.getItem("credentials");
  headers = JSON.parse(headers);
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json",
  };
  try {
    let response = await axios.post(
      "/votes",
      {params: jokeId },
      {
        headers: headers,
      }
    );
    
    return response.data;
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};
export { positiveVote };
