import React from "react";
import JokeManager from "./components/JokeManager";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <>
      <h1 data-cy="title">Funny Jokes</h1>
      <JokeManager />
      <button data-cy="login">
        Login
      </button>
      <LoginForm />
    </>
  );
};

export default App;
