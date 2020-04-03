import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'
import messages from '../../AutoDismissAlert/messages'
// import Layout from '../shared/Layout'

class DeleteGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      game: null
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/games/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ game: res.data.game }))
      .catch(() => {
        const { msgAlert } = this.props.update.props
        msgAlert({
          heading: 'Failed to Update Game',
          message: messages.updateGameFailure,
          variant: 'danger'
        })
      })
  }

  componentDidUpdate () {
    // const newGame = this.props.update
    const oldGame = this.state.game
    // ('1')
    // (newGame)
    // ('2')
    // (this.props.update)
    // ('3')
    // (this.props)
    const b = {
      game: {
        score: 10000000,
        player: this.props.user._id,
        completed: false
      }
    }
    if (oldGame !== b) {
      axios({
        url: `${apiUrl}/games/${this.props.match.params.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.props.user.token}`
        },
        data: b
      })
    }
  }

  render () {
    // const { handleChange, handleSubmit } = this
    let display
    if (this.state.createdGame) {
      display = (<p>...Loading</p>)
    } else {
      display = (<p>...Loading</p>)
    }

    return (
      display
    )
  }
}

export default DeleteGame
