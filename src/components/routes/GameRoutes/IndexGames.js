import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../../apiConfig'
import messages from '../../AutoDismissAlert/messages'

class IndexGames extends Component {
  constructor () {
    // Call the constructor on `Component` (the parent class)
    super()

    this.state = {
      games: null
    }
  }

  componentDidMount () {
    // Run once, when the component mounts
    // This is where our API request will go
    axios({
      url: `${apiUrl}/games`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ games: res.data.games })
        const { msgAlert } = this.props
        msgAlert({
          heading: 'All games',
          message: messages.indexGameSuccess,
          variant: 'success'
        })
      })
      .catch(() => {
        const { msgAlert } = this.props
        msgAlert({
          heading: 'Failed to get games',
          message: messages.indexGameFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // Destructure things from state:
    const { games } = this.state
    let gamesDisplay
    // 3 states:
    // if movies is `null`, we are loading
    if (!games) {
      gamesDisplay = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    } else if (games.length === 0) {
      // If the array of movies is empty, we have no movies to show
      gamesDisplay = 'No games yet, go make some!'
    } else {
      // Otherwise, display the movies
      const gamesList = games.map(games => (
        <li key={games._id}>
          <Link to={`/show-game/${games._id}`}>{games._id}</Link>
        </li>
      ))

      gamesDisplay = (
        <ul>
          {gamesList}
        </ul>
      )
    }
    return (
      <div>
        <h1>Games Played</h1>
        {gamesDisplay}
      </div>
    )
  }
}

export default IndexGames
