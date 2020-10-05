import React, { Component } from "react";
import JokeManager from "./components/JokeManager";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import { Menu, Button, Grid  } from "semantic-ui-react";

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
            <Button
              primary
              id="login"
              data-cy="login"
              onClick={() => this.setState({ showLoginForm: true })}
            >
              Login
            </Button>
            <p data-cy="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p data-cy="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
      default:
        break;
    }
    return (
      <div class="backgroundImage">
        <Menu size="small" inverted>
          <Menu.Menu position="right">
            <Menu.Item>{renderLogin}</Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid style={{ height: "100vh" }} textAlign="center">
          <Grid.Row style={{ height: "24%" }}>
            <h1 data-cy="title" class="title">
              Funny Jokes
            </h1>
          </Grid.Row>
          <Grid.Row style={{ height: "76%" }}>
            <JokeManager authenticated={this.state.authenticated} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
