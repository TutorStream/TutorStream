import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password: '',
      newEmail: '',
      tests: [],
      isTutor: false,
      bio: ''
    }
    // bind funcs here, OR just use arrow funcs?
  }
  render () {
    return (
      <div>
        <form className="" onSubmit={/*wahtever click handler*/}>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <button type="submit" value="Submit"></button>
        </form>
      </div>
    )
  }
}


export default Signup;