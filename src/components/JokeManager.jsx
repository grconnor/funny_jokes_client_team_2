import React, { Component } from "react";
import { getJoke, saveJoke } from "../modules/joke";
import { positiveVote } from "../modules/positiveVote";
import { Button, Container, Grid } from "semantic-ui-react";

class JokeManager extends Component {
  state = {
    currentJoke: {},
    displayJoke: false,
    voteSaved: false,
    voteMessage: "",
    jokeSaved: "",
    savedJokeMessage: "",
  };

  getRandomJoke = async () => {
    let result = await getJoke();
    this.setState({
      currentJoke: result,
      displayJoke: true,
      voteSaved: false,
      jokeSaved: false,
    });
  };

  voteSaved = async () => {
    let response = await positiveVote(this.state.currentJoke.id);
    if (response !== false) {
      this.setState({
        currentJoke: response.joke,
        voteSaved: true,
        voteMessage: response.message,
      });
    }
  };

  jokeSaved = async () => {
    let response = await saveJoke(
      this.state.currentJoke.id,
      this.state.currentJoke.content
    );
    if (response !== false) {
      this.setState({
        jokeSaved: true,
        savedJokeMessage: response.message,
      });
    }
  };

  render() {
    let currentJokeContent = this.state.currentJoke.content;
    let currentJokeUpvote = this.state.currentJoke.upvotes;

    return (
      <>
        <Grid.Row style={{ width: "100%", height: "45%" }}>
          {this.state.displayJoke && (
            <div data-cy="random-joke">
              <Container textAlign="center" style={{ width: "45%" }}>
                <p>{currentJokeContent}</p>
                <h3 data-cy="upvote">upvotes: {currentJokeUpvote}</h3>
              </Container>
              <Container textAlign="center">
                {this.props.authenticated && !this.state.voteSaved ? (
                  <Button
                    basic
                    color="green"
                    data-cy="vote-button"
                    onClick={this.voteSaved}
                  >
                    Vote +{" "}
                  </Button>
                ) : (
                  <h3 data-cy="vote-message"> {this.state.voteMessage}</h3>
                )}
                {this.props.authenticated && !this.state.jokeSaved ? (
                  <Button
                    basic
                    color="red"
                    data-cy="save-joke-button"
                    onClick={this.jokeSaved}
                  >
                    Save Joke
                  </Button>
                ) : (
                  <h3 data-cy="saved-joke-message">
                    {this.state.savedJokeMessage}
                  </h3>
                )}
              </Container>
            </div>
          )}
        </Grid.Row>

        <Grid.Row style={{ height: "60%" }}>
          <Button
            color="yellow"
            size="large"
            onClick={this.getRandomJoke}
            data-cy="joke"
          >
            Get the joke you need right now
          </Button>
        </Grid.Row>
      </>
    );
  }
}

export default JokeManager;
