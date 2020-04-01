import React, { PureComponent } from 'react'
// import Konva from 'konva'
import { Rect, Stage, Layer } from 'react-konva'

// const MIN_X = 12
// const MIN_Y = 12
// const MAX_X = 800 - MIN_X
// const MAX_Y = 600 - MIN_Y
// const SPEED = 30
// initilize to zero and base
export default class Animations extends PureComponent {
  state = {
    colorOne: 'red',
    colorTwo: 'pink',
    colorThree: 'maroon',
    x1: Math.floor(Math.random() * 800),
    x2: Math.floor(Math.random() * 800),
    x3: Math.floor(Math.random() * 800),
    y: 0,
    speed: 1,
    score: 0,
    ready: false,
    count: 0,
    strike: 0,
    animation: null
  }

  componentDidMount () {
    this.startGame()
  }

  clickEvent = (event) => {
    const { setScore } = this.props
    let { colorOne, colorTwo, colorThree, score } = this.state
    if (event.target.getAttrs().fill === 'red') {
      colorOne = 'blue'
      score = score + 1
    } else if (event.target.getAttrs().fill === 'pink') {
      colorTwo = 'blue'
      score = score + 1
    } else if (event.target.getAttrs().fill === 'maroon') {
      colorThree = 'blue'
      score = score + 1
    }
    this.setState({ score: score })
    setScore(score)
    this.setState({ colorOne: colorOne, colorTwo: colorTwo, colorThree: colorThree })
  }

  reset = () => {
    this.setState({
      colorOne: 'red',
      colorTwo: 'pink',
      colorThree: 'maroon',
      x1: Math.floor(Math.random() * 800),
      x2: Math.floor(Math.random() * 800),
      x3: Math.floor(Math.random() * 800),
      y: 0,
      speed: 1,
      score: 0,
      ready: false,
      count: 0,
      strike: 0
    })
  }

  startGame = () => {
    const animation = setInterval(this.move, 0)
    this.setState({ animation: animation })
  }

  endGame = () => {
    clearInterval(this.state.animation)
  }

  move = () => {
    let { y, speed, x1, x2, x3, count, colorOne, colorTwo, colorThree, strike } = this.state
    y = y + speed
    if (y >= 800) {
      if (colorOne === 'red') {
        strike = strike + 1
      }
      if (colorTwo === 'pink') {
        strike = strike + 1
      }
      if (colorThree === 'maroon') {
        strike = strike + 1
      }
      y = 0
      colorOne = 'red'
      colorTwo = 'pink'
      colorThree = 'maroon'
      count = count + 1
      if (speed < 30 && count % 10 === 0) {
        speed = speed + 1
      }
      x1 = Math.floor(Math.random() * 800)
      x2 = Math.floor(Math.random() * 800)
      x3 = Math.floor(Math.random() * 800)
    }
    console.log(strike)
    if (strike === 3) {
      this.endGame()
    } else {
      this.setState({ y: y, x1: x1, x2: x2, x3: x3, count: count, colorOne: colorOne, colorTwo: colorTwo, colorThree: colorThree })
    }
  }

  render () {
    const { y, x1, x2, x3, colorOne, colorTwo, colorThree } = this.state
    return (
      <Stage width={900} height={800} >
        <Layer>
          <Rect
            x={x1}
            y={y}
            width={100}
            height={100}
            opacity={1}
            fill={colorOne}
            onClick={this.clickEvent}
          />
          <Rect
            x={x2}
            y={y}
            width={100}
            height={100}
            opacity={1}
            fill={colorTwo}
            onClick={this.clickEvent}
          />
          <Rect
            x={x3}
            y={y}
            width={100}
            height={100}
            opacity={1}
            fill={colorThree}
            onClick={this.clickEvent}
          />
        </Layer>
      </Stage>
    )
  }

  componentWillUnmount () {
    clearInterval(this.animationTimeout)
  }
}
