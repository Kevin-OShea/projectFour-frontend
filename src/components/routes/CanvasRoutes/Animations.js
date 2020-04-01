import React, { PureComponent } from 'react'
// import Konva from 'konva'
import { Rect } from 'react-konva'

// const MIN_X = 12
// const MIN_Y = 12
// const MAX_X = 800 - MIN_X
// const MAX_Y = 600 - MIN_Y
// const SPEED = 30
// initilize to zero and base
export default class Ball extends PureComponent {
  state = {
    color: 'red',
    x: Math.floor(Math.random() * 700),
    y: 0,
    timeout: 100,
    score: 0,
    rect: null
  }

  componentDidMount () {
    this.move()
  }

  newCoord = (val, delta, max, min) => {
  }

  animate = () => {
  }

  click = (event) => {
    this.setState({ rect: event.target })
    const data = event.target.getAttrs()
    let { score } = this.state
    if (data.fill === 'red') {
      event.target.setAttrs({
        fill: 'blue'
      })
      score = score + 1
      this.setState({ score: score })
    } else {
      console.log('Cant click!')
    }
  }

  checkPos = (event) => {
    console.log('hello')
  }

  move = () => {
    let { x, y } = this.state
    const { score, rect } = this.state
    console.log(score)
    if (y === 800) {
      x = Math.floor(Math.random() * 700)
      y = 0
      rect.setAttrs({ fill: 'red' })
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
        opacity={1}
        fill='red'
        onClick={this.click}
        position={this.checkPos}
      />
    )
  }

  componentWillUnmount () {
    clearTimeout(this.animationTimeout)
  }
}
