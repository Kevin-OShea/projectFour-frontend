import React, { Component } from 'react'
import { Stage, Layer } from 'react-konva'
import Animations from './Animations'
class GamePage extends Component {
  constructor () {
    super()

    this.state = {
      score: 0
    }
  }
  render () {
    return (
      <div>
        <Stage width={800} height={700} >
          <Layer>
            <Animations> </Animations>
          </Layer>
        </Stage>
      </div>
    )
  }
}
export default GamePage
