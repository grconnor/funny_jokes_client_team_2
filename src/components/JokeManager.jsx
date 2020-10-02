import React, { Component } from "react";
import { getJoke } from "../modules/joke";

class JokeManager extends Component {
  state = {
    currentJoke: {},
    displayJoke: false,
    voteSaved: false,
  };

  getRandomJoke = async () => {
    let result = await getJoke();
    this.setState({ currentJoke: result, displayJoke: true });
  };

  voteSaved = async() => {
    let voteSaved = await positiveVote()
      this.setState({
        currentJoke: voteSaved,
        voteSaved: true
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
            <p data-cy="upvotes">upvotes: {currentJokeUpvote}</p>
            {this.props.authenticated && !this.state.voteSaved ? (
              <button data-cy="vote-button" onClick={this.voteSaved}>
                Vote + </button>
            ) : (
                <p data-cy="vote-message">Your vote has been submitted</p>
              )};


          </div>
        )}
      </>
    );
  }
}

export default JokeManager;
