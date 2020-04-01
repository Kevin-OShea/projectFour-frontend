import React, { Component } from 'react'
import Animations from './Animations'
class GamePage extends Component {
  constructor () {
    super()

    this.state = {
      score: 0,
      over: false
    }
  }

  setScore = (score) => this.setState({ score })

  setGameOver = (over) => this.setState({ over })

  click = click => console.log('CLICK')

  render () {
    const update = {
      props: this.props
    }
    return (
      <div>
        <Animations setScore={this.setScore} update={update}/>
      </div>
    )
  }
}
export default GamePage
