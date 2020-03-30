import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'
// import Layout from '../shared/Layout'

class UpdateGame extends Component {
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
      .catch(console.error)
  }

  componentDidUpdate () {
    // const newGame = this.props.update
    const oldGame = this.state.game
    // console.log('1')
    // console.log(newGame)
    // console.log('2')
    // console.log(this.props.update)
    // console.log('3')
    // console.log(this.props)
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

export default UpdateGame
