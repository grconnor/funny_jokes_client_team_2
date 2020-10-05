import React, { Component } from "react";
import { getJoke, saveJoke } from "../modules/joke";
import { positiveVote } from "../modules/positiveVote";
import { Menu, Button, Container, Grid, Card } from "semantic-ui-react";

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
              <Container
                textAlign="center"
                floated="left"
                style={{ width: "40%" }}
              >
                <p>{currentJokeContent}</p>
                <p data-cy="upvote">upvotes: {currentJokeUpvote}</p>
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
                  <p data-cy="vote-message"> {this.state.voteMessage}</p>
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
                  <p data-cy="saved-joke-message">
                    {this.state.savedJokeMessage}
                  </p>
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
