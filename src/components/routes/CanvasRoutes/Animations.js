import React, { PureComponent } from 'react'
// import { Redirect } from 'react-router-dom'
// import Konva from 'konva'
import { Rect, Stage, Layer } from 'react-konva'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

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
    animation: null,
    renderAnimation: true
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

  heightCheck = () => {
    let { x1, x2, x3, colorOne, colorTwo, colorThree, strike } = this.state
    if (colorOne === 'red') {
      strike = strike + 1
    }
    if (colorTwo === 'pink') {
      strike = strike + 1
    }
    if (colorThree === 'maroon') {
      strike = strike + 1
    }
    colorOne = 'red'
    colorTwo = 'pink'
    colorThree = 'maroon'
    x1 = Math.floor(Math.random() * 800)
    x2 = Math.floor(Math.random() * 800)
    x3 = Math.floor(Math.random() * 800)
    if (strike >= 3) {
      this.endGame()
    } else {
      this.setState({ x1: x1, x2: x2, x3: x3, colorOne: colorOne, colorTwo: colorTwo, colorThree: colorThree, strike: strike })
    }
  }

  startGame = () => {
    const animation = setInterval(this.move, 0)
    this.setState({ animation: animation })
  }

  endGame = () => {
    clearInterval(this.state.animation)
    console.log(this.props)
    const data = {
      game: {
        score: this.state.score,
        player: this.props.update.props.user._id,
        completed: true
      }
    }
    console.log(this.props.update.props.gameId)
    axios({
      url: `${apiUrl}/games/${this.props.update.props.gameId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.update.props.user.token}`
      },
      data
    })
      .then(res => {
        this.setState({ renderAnimation: false })
      })
      .catch(console.error)
  }
  // change this so its not checking every milisecond!
  move = () => {
    let { y, speed, count } = this.state
    // console.log(speed)
    y = y + speed
    if (y >= 800) {
      y = 0
      this.heightCheck()
      count = count + 1
      if (speed < 15 && count % 8 === 0) {
        speed = speed + 1
        count = 0
        console.log(speed)
      }
    }
    this.setState({ y: y, speed: speed, count: count })
  }

  render () {
    const { y, x1, x2, x3, colorOne, colorTwo, colorThree } = this.state
    if (this.state.renderAnimation === true) {
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
    } else {
      return (
        <div>
          <h1>Game Over:</h1>
          <Link to={`/show-game/${this.props.update.props.gameId}`}>Show Results</Link>
        </div>)
    }
  }

  componentWillUnmount () {
    clearInterval(this.animationTimeout)
  }
}
