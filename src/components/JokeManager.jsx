import React, { Component } from "react";
import { getJoke } from "../modules/joke";
import { positiveVote } from "../modules/positiveVote"

class JokeManager extends Component {
  state = {
    currentJoke: {},
    displayJoke: false,
    voteSaved: false,
    voteMessage: ""
  };

  getRandomJoke = async () => {
    let result = await getJoke();
    this.setState({ currentJoke: result, displayJoke: true });
  };

  voteSaved = async () => {
    let voteSaved = await positiveVote()
    this.setState({
      currentJoke: voteSaved.joke,
      voteSaved: true,
      voteMessage: voteSaved.message
    });
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
              <button data-cy="vote-button" onClick={this.voteSaved}>
                Vote + </button>
            ) : (
            <p data-cy="vote-message"> { this.state.voteMessage }</p>
              )}
          </div>
        )}
      </>
    );
  }
}

export default JokeManager;
