import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../../apiConfig'

class IndexGames extends Component {
  constructor () {
    // Call the constructor on `Component` (the parent class)
    super()

    this.state = {
      game: null,
      deleted: false
    }
  }

  componentDidMount () {
    // Run once, when the component mounts
    // This is where our API request will go
    axios({
      url: `${apiUrl}/games/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ game: res.data.game }))
      .catch(console.error)
  }

  delete = (event) => {
    axios({
      url: `${apiUrl}/games/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    // Destructure things from state:
    const { game } = this.state
    console.log(game)
    let gameDisplay
    // 3 states:
    // if movies is `null`, we are loading
    if (!game) {
      gameDisplay = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (this.state.deleted) {
      gameDisplay = <Redirect to={'/index-games'}/>
    } else if (this.props.user._id === game.owner) {
      // Otherwise, display the movies
      let completed = 'NO'
      if (game.completed) {
        completed = 'YES'
      }
      gameDisplay = (
        <div>
          <h1>Game Id:</h1>
          <h3>{game._id}</h3>
          <h1>Game Score:</h1>
          <h3>{game.score}</h3>
          <h1>Game Finished:</h1>
          <h3>{completed}</h3>
          <button onClick={this.delete}>Delete Game</button>
        </div>
      )
    } else {
      let completed = 'NO'
      if (game.completed) {
        completed = 'YES'
      }
      gameDisplay = (
        <div>
          <h1>Game Id:</h1>
          <h3>{game._id}</h3>
          <h1>Game Score:</h1>
          <h3>{game.score}</h3>
          <h1>Game Finished:</h1>
          <h3>{completed}</h3>
        </div>
      )
    }
    return (
      <div>
        <h1>Games Played</h1>
        {gameDisplay}
      </div>
    )
  }
}

export default IndexGames
