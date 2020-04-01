import React, { PureComponent } from 'react'
import Konva from 'konva'
import { Rect } from 'react-konva'

// const MIN_X = 12
// const MIN_Y = 12
// const MAX_X = 800 - MIN_X
// const MAX_Y = 600 - MIN_Y
// const SPEED = 30
// initilize to zero and base
export default class Ball extends PureComponent {
  state = {
    color: Konva.Util.getRandomColor(),
    x: Math.floor(Math.random() * 700),
    y: 0,
    timeout: 100
  }
  componentDidMount () {
    this.move()
  }

  newCoord = (val, delta, max, min) => {
  }

  animate = () => {
  }

  click = (event) => {
    console.log(event.target)
  }

  move = () => {
    let { x, y } = this.state
    if (y === 100) {
      x = Math.floor(Math.random() * 700)
      y = 0
    } else {
      y = y + 5
    }
    this.setState({ y: y, x: x })
    this.animationTimeout = setTimeout(this.move, 30)
  }

  render () {
    const { x, y } = this.state
    return (
      <Rect
        x={x}
        y={y}
        width={100}
        height={100}
        fill="red"
        onClick={this.click}
      />
    )
  }

  componentWillUnmount () {
    clearTimeout(this.animationTimeout)
  }
}
