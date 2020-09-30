import React, { Component } from "react";
import { getJoke } from "../modules/joke";

class JokeManager extends Component {
  state = {
    currentJoke: {},
  };

  getRandomJoke = async () => {debugger
    let result = await getJoke();
    this.setState({ currentJoke: result });
  };

  render() {
    let currentJokeContent = this.state.currentJoke.content;
    let currentJokeUpvote = this.state.currentJoke.upvotes;
  
    return (
      <>
        <button onClick={this.getRandomJoke} data-cy="joke-getter">
          Get the joke you need right now
        </button>
        <div data-cy="random-joke">
          <p>{currentJokeContent}</p>
          <p data-cy='upvotes'>upvotes: {currentJokeUpvote}</p>
        </div>
      </>
    );
  }
}

export default JokeManager;
