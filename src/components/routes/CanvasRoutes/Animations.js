import React, { Component } from 'react'
import CreateCanvas from './CreateCanvas'
class Animations extends Component {
  constructor (props) {
    super(props)
    this.state = { yCord: 0 }
    this.updateAnimationState = this.updateAnimationState.bind(this)
  }

  componentDidMount () {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  updateAnimationState () {
    let num = this.state.yCord
    if (num === 1000) {
      num = -1
    } else {
      num = num + 1
    }
    this.setState(prevState => ({ yCord: num }))
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.rAF)
  }

  render () {
    return <CreateCanvas yCord={this.state.yCord}/>
  }
}

export default Animations
