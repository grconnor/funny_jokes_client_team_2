import React from "react";
import JokeManager from "./components/JokeManager";

const App = () => {
  return (
    <>
    <h1 data-cy="title">Funny Jokes</h1>
      <JokeManager />
    </>
  );
};

export default App;
