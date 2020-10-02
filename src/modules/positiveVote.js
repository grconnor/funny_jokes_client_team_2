import axios from "axios";
const positiveVote = async () => {
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
      {},
      {
        headers: headers,
      }
    );debugger
    return response.data;
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};
export { positiveVote };
