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
      {jokeId },
      {
        headers: headers,
      }
    );
    debugger
    return response.data;
  } catch (err) {
    
    console.error(err);
    alert("Sorry, we are not that funny, we don't have that joke!" );
    return false
  }
};
export { positiveVote };
