import React, { Component } from 'react'

class JokeManager extends Component {
  state = {
    currentJoke: {}
  }
  
  getRandomJoke = async () => {
    let result = await getJoke()
    this.setState({currentJoke: result}) 

  }

  render() {
    
    return (
      <>
        <button onClick={getRandomJoke} data-cy="joke-getter">Get the joke you need right now</button>
      </>
    )
  }
}

export default JokeManager
