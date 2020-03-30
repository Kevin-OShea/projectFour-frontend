import React from 'react'

const CreateCanvas = () => (
  <div>
    <div id='canvasDiv' onLoad="draw()">
      <canvas id="tutorial" width="150" height="150"></canvas>
    </div>
  </div>
)

export default CreateCanvas
