import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../Auth/AuthService'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      redirectToPreviousRoute: false
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
    e.preventDefault();
    axios.post('/users/login', {
      Email : this.state.Email,
      Password: this.state.Password
    })
    .then(({data}) => {
      console.log(data, this.props, 'asdf')
      var ID = data.ID
      this.props.getID(ID);
      if(!!data.ID) {
        AuthService.authenticate()
        this.setState({
          redirectToPreviousRoute: true
        })
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToPreviousRoute } = this.state 

    if (redirectToPreviousRoute) {
      return <Redirect to={from}{...this.props}/>
    }
    return (
      <div>
        <form className='login' onSubmit={(e) => {this.handeLoginSubmit(e)}}>
          <label>Email</label>
          <input value={this.state.Email} name="Email" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Password</label>
          <input type="password" value={this.state.loginPassword} name="Password" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <button type="submit" value="Submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;