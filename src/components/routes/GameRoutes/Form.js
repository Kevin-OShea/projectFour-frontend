import React from 'react'

const Form = ({ name, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Username</label>
    <label>
      <input
        placeholder="My Awesome Username"
        value={name}
        name='username'
        onChange={handleChange}
      />
    </label>
    <button type="submit">Submit</button>
  </form>
)

export default Form
