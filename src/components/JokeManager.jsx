import React, { Component } from "react";
import { getJoke, saveJoke } from "../modules/joke";
import { positiveVote } from "../modules/positiveVote";


class JokeManager extends Component {
  state = {
    currentJoke: {},
    displayJoke: false,
    voteSaved: false,
    voteMessage: "",
    jokeSaved: "",
    savedJokeMessage: ""
  };

  getRandomJoke = async () => {
    let result = await getJoke();
    this.setState({ currentJoke: result, displayJoke: true, voteSaved: false });
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
    let response = await saveJoke(this.state.currentJoke.id, this.state.currentJoke.content);
    if (response !== false) {
      this.setState({
        currentJoke: response.joke,
        jokeSaved: true,
        savedJokeMessage: response.message,
      });
      debugger
    }
  };


  render() {
    let currentJokeContent = this.state.currentJoke.content;
    let currentJokeUpvote = this.state.currentJoke.upvotes;

    return (
      <>
        <button onClick={this.getRandomJoke} data-cy="joke">
          Get the joke you need right now
        </button>
        {this.state.displayJoke && (
          <div data-cy="random-joke">
            <p>{currentJokeContent}</p>
            <p data-cy="upvote">upvotes: {currentJokeUpvote}</p>
            {this.props.authenticated && !this.state.voteSaved ? (
              <div>
                <button data-cy="vote-button" onClick={this.voteSaved}>
                  Vote +{" "}
                </button>
              </div>
            ) : (
                <div>
                  <p data-cy="vote-message"> {this.state.voteMessage}</p>
                </div>
              )}
            {this.props.authenticated && !this.state.jokeSaved ? (
              <div>
                <button data-cy="save-joke-button" onClick={this.jokeSaved}>
                  Save Joke
              </button>
              </div>
            ) : (
                <div>
                  <p data-cy="saved-joke-message"> {this.state.savedJokeMessage}</p>
                </div>
              )}
          </div>
        )}
      </>
    );
  }
}

export default JokeManager;
