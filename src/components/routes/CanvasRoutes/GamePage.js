import React, { Component } from 'react'
import Animations from './Animations'
class GamePage extends Component {
  constructor () {
    super()

    this.state = {
      score: 0
    }
  }

  setScore = (score) => this.setState({ score })

  setReady = (readyAll) => this.setState({ readyAll })
  getReady = () => this.state.readyAll

  click = click => console.log('CLICK')

  render () {
    return (
      <div>
        <Animations setScore={this.setScore}/>
      </div>
    )
  }
}
export default GamePage
