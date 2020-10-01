import React, { Component } from "react";
import JokeManager from "./components/JokeManager";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    showLoginForm: true,
    authenticated: false,
    message: "",
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, showLoginForm: true });
    }
  };

  render() {
    return (
      <>
        <h1 data-cy="title">Funny Jokes</h1>
        <JokeManager />

        {this.state.showLoginForm ? (
          <button
            data-cy="login"
            onClick={() => this.setState({ showLoginForm: false })}
          >
            Login
          </button>
        ) : (
          <LoginForm submitFormHandler={this.onLogin} />
        )}
      </>
    );
  }
}

export default App;
