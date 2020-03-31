import React, { Component } from 'react'

class CreateCanvas extends Component {
  constructor (props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = {
      randomX: Math.floor(Math.random() * 700)
    }
  }

  componentDidUpdate () {
    // Draws a square in the middle of the canvas rotated
    // around the centre by this.props.angle
    const { yCord, randomX } = this.props
    if (yCord === 1000) {
      const newX = Math.floor(Math.random() * 700)
      this.setState({ randomX: newX })
    }
    console.log(randomX)
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    ctx.save()
    ctx.beginPath()
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#4397AC'
    ctx.fillRect(50, yCord, 50, 50)
    ctx.restore()
  }

  render () {
    return (
      <canvas width="700" height="1000" ref={this.canvasRef} />
    )
  }
}

export default CreateCanvas
