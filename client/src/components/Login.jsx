import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../Auth/AuthService';
import { Redirect } from 'react-router-dom';
import Signup from './SignUp.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      redirectToPreviousRoute: false
    };
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginSubmit = e => {
    e.preventDefault();
    axios
      .post('/users/login', {
        Email: this.state.Email,
        Password: this.state.Password
      })
      .then(({ data }) => {
        var id = data.id;
        this.props.getid(id);
        console.log('props for login: ', this.props);
        this.props.checkTutorStatus(id, this.props.tutors_ids);
        if (!!data.id) {
          AuthService.authenticate();
          this.setState({
            redirectToPreviousRoute: true
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToPreviousRoute } = this.state;
    if (redirectToPreviousRoute) {
      return <Redirect to={from} {...this.props} />;
    }
    return (
      <div>
        <form
          className="login"
          onSubmit={e => {
            this.handleLoginSubmit(e);
          }}
        >
          <label>Email</label>
          <input
            value={this.state.Email}
            name="Email"
            onChange={e => {
              this.inputHandler(e);
            }}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            value={this.state.loginPassword}
            name="Password"
            onChange={e => {
              this.inputHandler(e);
            }}
          />
          <br />
          <button type="submit" value="Submit">
            Login
          </button>
        </form>

        <Signup {...this.props} />
      </div>
    );
  }
}

export default Login;
