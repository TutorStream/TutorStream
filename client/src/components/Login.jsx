import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: ''
    }
    // bind methods OR just arrow funcs?
    this.inputHandler = this.inputHandler.bind(this);
    this.handeLoginSubmit = this.handeLoginSubmit.bind(this);
  }
  inputHandler (e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handeLoginSubmit () {
    axios.gets('/users/login', {
      params : {
        username : this.state.loginUsername,
        password: this.state.loginPassword
      }
    })
    .then(({data}) => {
      console.log('data ', data);
      // no need to set state, simply re-direct to approved login page 
        // OR if not authetnicated, sned back "error, not authenticated user"
      // re-direct view to user homepage? or tutor homepage
    })
    .catch((err) => {
      console.error(err);
    })
  }
  render () {
    return (
      <div>
        <form onSubmit={() => {this.handeLoginSubmit()}}>
          <label>Username</label>
          <input value={this.state.loginUsername} name="loginUsername" onChange={(e) => {this.inputHandler(e)}}></input>
          <label>Password</label>
          <input value={this.state.loginPassword} name="loginPassword" onChange={(e) => {this.inputHandler(e)}}></input>
          <button type="submit" value="Submit"></button>
        </form>
      </div>
    )
  }
}

export default Login;