import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'
// import Layout from '../shared/Layout'

class CreateGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: {
        score: 0,
        player: this.props.user._id,
        completed: false
      },
      createdGame: null,
      updated: false
    }
  }

  componentDidMount () {
    const { setGame } = this.props
    axios({
      url: `${apiUrl}/games`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: {
        game: this.state.game
      }
    })
      .then(res => {
        this.setState({ game: res.data.game, createdGame: res.data.game._id })
        setGame(res.data.game._id)
      })
      .catch(console.error)
  }

  render () {
    // const { handleChange, handleSubmit } = this
    let display
    if (this.state.createdGame) {
      // display = <Redirect to={`/update-game/${this.state.createdGame}`}/>
      display = <Redirect to={'/play-game'}/>
    } else {
      display = (<p>...Loading</p>)
    }

    return (
      <div>
        {display}
      </div>
    )
  }
}

export default CreateGame
