import React, { Component } from "react";
import JokeManager from "./components/JokeManager";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";

class App extends Component {
  state = {
    showLoginForm: false,
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
      this.setState({ message: response.message, showLoginForm: false });
    }
  };

  render() {
    const { showLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case showLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !showLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onClick={() => this.setState({ showLoginForm: true })}
            >
              Login
            </button>
            <p>{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p>Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        break;
      default:
        break;
    }
    return (
      <>
        <h1 data-cy="title">Funny Jokes</h1>
        <JokeManager />
        {renderLogin}
      </>
    );
  }
}

export default App;
