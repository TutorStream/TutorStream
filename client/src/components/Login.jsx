import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.handeLoginSubmit = this.handeLoginSubmit.bind(this);
  }

  inputHandler (e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handeLoginSubmit (e) {
    console.log('sending login request to server');
    e.preventDefault();
    axios.get('/users/login', {
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
        <div className="homepage-btn">
          <button onClick={() => {this.props.returnToHomepage()}}>Home</button>
        </div>
        <br></br>
        <form onSubmit={(e) => {this.handeLoginSubmit(e)}}>
          <label>Username</label>
          <input value={this.state.loginUsername} name="loginUsername" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Password</label>
          <input type = "password" value={this.state.loginPassword} name="loginPassword" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <button type="submit" value="Submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;