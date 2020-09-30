import React, { Component } from "react";
import { getJoke } from "../modules/joke";

class JokeManager extends Component {
  state = {
    currentJoke: {},
    displayJoke: false
  };

  getRandomJoke = async () => {
    let result = await getJoke();
    this.setState({ currentJoke: result, displayJoke: true });
  };

  render() {
    let currentJokeContent = this.state.currentJoke.content;
    let currentJokeUpvote = this.state.currentJoke.upvotes;

    return (
      <>
        <button onClick={this.getRandomJoke} data-cy="joke-getter">
          Get the joke you need right now
        </button>
        {this.state.displayJoke && (
          <div data-cy="random-joke">
          <p>{currentJokeContent}</p>
          <p data-cy="upvotes">upvotes: {currentJokeUpvote}</p>
        </div>
        )}
      </>
    );
  }
}

export default JokeManager;
