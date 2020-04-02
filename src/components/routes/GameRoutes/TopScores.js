import React, { Component } from 'react'

// Import Axios:
import axios from 'axios'
// Import apiConfig:
import apiUrl from '../../../apiConfig'
import messages from '../../AutoDismissAlert/messages'

class TopScore extends Component {
  constructor () {
    // Call the constructor on `Component` (the parent class)
    super()

    this.state = {
      games: null,
      deleted: false
    }
  }

  componentDidMount () {
    // Run once, when the component mounts
    // This is where our API request will go
    axios({
      url: `${apiUrl}/scorelists`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => {
        const { msgAlert } = this.props
        msgAlert({
          heading: 'Showing Game',
          message: messages.showGamesSuccess,
          variant: 'success'
        })
        console.log(res)
        this.setState({ games: res.data.scorelists })
      })
      .catch(() => {
        const { msgAlert } = this.props
        msgAlert({
          heading: 'Failed to get Game',
          message: messages.showGamesFailure,
          variant: 'danger'
        })
        console.error()
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
    } else {
      const gamesList = games.map(games => (
        <li key={games._id}>
          <div>
            <h1>Placement</h1>
            <h2>{games.placement}</h2>
            <h1>Username:</h1>
            <h3>{games.username}</h3>
            <h1>Score:</h1>
            <h3>{games.score}</h3>
          </div>
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

export default TopScore
