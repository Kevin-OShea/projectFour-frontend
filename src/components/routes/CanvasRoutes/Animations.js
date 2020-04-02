import React, { PureComponent } from 'react'
// import { Redirect } from 'react-router-dom'
// import Konva from 'konva'
import { Rect, Stage, Layer } from 'react-konva'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import messages from '../../AutoDismissAlert/messages'
import Form from './../GameRoutes/Form'

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
    name: '',
    animation: null,
    gameOver: false,
    renderAnimation: true,
    renderNext: false
  }

  componentDidMount () {
    let { x1, x2, x3 } = this.state
    let correctDistance = false
    while (correctDistance === false) {
      const distOne = Math.abs(x1 - x2)
      const distTwo = Math.abs(x1 - x3)
      const distThree = Math.abs(x2 - x3)

      if (distOne < 100) {
        x1 = Math.floor(Math.random() * 800)
        continue
      }

      if (distTwo < 100) {
        x2 = Math.floor(Math.random() * 800)
        continue
      }

      if (distThree < 100) {
        x3 = Math.floor(Math.random() * 800)
        continue
      }

      correctDistance = true
    }
    this.setState({ x1, x2, x3 })
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

  heightCheck = (y, speed, count) => {
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
    // three checks (1,2) (1,3) (2,3)
    let correctDistance = false
    while (correctDistance === false) {
      const distOne = Math.abs(x1 - x2)
      const distTwo = Math.abs(x1 - x3)
      const distThree = Math.abs(x2 - x3)

      if (distOne < 100) {
        x1 = Math.floor(Math.random() * 800)
        continue
      }

      if (distTwo < 100) {
        x2 = Math.floor(Math.random() * 800)
        continue
      }

      if (distThree < 100) {
        x3 = Math.floor(Math.random() * 800)
        continue
      }

      correctDistance = true
    }

    if (strike >= 3) {
      this.endGame()
    } else {
      this.setState({ y: y, speed: speed, count: count, x1: x1, x2: x2, x3: x3, colorOne: colorOne, colorTwo: colorTwo, colorThree: colorThree, strike: strike })
    }
  }

  startGame = () => {
    const animation = setInterval(this.move, 0)
    this.setState({ animation: animation })
  }

  endGame = () => {
    this.setState({ gameOver: true })
    clearInterval(this.state.animation)
    const data = {
      game: {
        score: this.state.score,
        player: this.props.update.props.user._id,
        completed: true
      }
    }
    axios({
      url: `${apiUrl}/games/${this.props.update.props.gameId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.props.update.props.user.token}`
      },
      data
    })
      .then(res => {
        const { msgAlert } = this.props.update.props
        msgAlert({
          heading: 'Updated Game',
          message: messages.updateGameSuccess,
          variant: 'success'
        })
        this.setState({ renderAnimation: false })
      })
      .catch(() => {
        const { msgAlert } = this.props.update.props
        msgAlert({
          heading: 'Failed to Update Game',
          message: messages.updateGameFailure,
          variant: 'danger'
        })
        console.error()
      })
  }
  // change this so its not checking every milisecond!
  move = () => {
    let { y, speed, count } = this.state
    // console.log(speed)
    y = y + speed
    if (y >= 800) {
      y = 0
      count = count + 1
      if (speed < 15 && count % 8 === 0) {
        speed = speed + 1
        count = 0
      }
      this.heightCheck(y, speed, count)
    } else {
      this.setState({ y: y, speed: speed, count: count })
    }
  }

  handleChange = event => {
    event.persist()
    this.setState({ name: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/scorelists`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.update.props.user.token}`
      },
      data: {
        scorelist: {
          score: this.state.score,
          username: this.state.name
        }
      }
    })
      .then(res => {
        const { msgAlert } = this.props.update.props
        msgAlert({
          heading: 'Uploaded Score',
          message: messages.createGameSuccess,
          variant: 'success'
        })
        this.setState({ renderNext: true })
      })
      .catch(error => {
        const { msgAlert } = this.props.update.props
        msgAlert({
          heading: error,
          message: messages.createGameFailure,
          variant: 'danger'
        })
        console.error()
      })
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
    } else if (this.state.renderNext === false) {
      // <Link to={`/show-game/${this.props.update.props.gameId}`}>Show Results</Link>
      return (
        <div>
          <h1>Game Over:</h1>
          <h2>Post your score</h2>
          <Form
            name={this.state.name}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>)
    } else {
      return (
        <div>
          <h1>Show Game Results</h1>
          <Link to={`/show-game/${this.props.update.props.gameId}`}>Show Results</Link>
        </div>
      )
    }
  }

  componentWillUnmount () {
    clearInterval(this.animationTimeout)
  }
}
