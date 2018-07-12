import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './../../Auth/AuthService';
import { Redirect } from 'react-router-dom';
import Signup from './SignUp.jsx';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox, 
  Button
} from 'react-bootstrap';

class Login extends Component {
  state = {
    Email: '',
    Password: '',
    redirectToPreviousRoute: false
  };

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
      <div className="background-img">
        <h4 className="title">
          <strong>Login:</strong>
        </h4>
        <form
          className="login"
          onSubmit={e => {
            this.handleLoginSubmit(e);
          }}
        >
        <FormGroup  controlId="formControlsLoginEmail">
          <ControlLabel>Email :</ControlLabel>
          <FormControl
            type="text"
            placeholder="what's your email again?"
            name="Email"
            onChange={e => {
              this.inputHandler(e);
            }}
          />
        </FormGroup>
        <FormGroup  controlId="formControlsLoginPassword">
          <ControlLabel>Password: </ControlLabel>
          <FormControl
            type="text"
            placeholder="let's get that password in here"
            name="Password"
            onChange={e => {
              this.inputHandler(e);
            }}
          />
        </FormGroup>
        <br />
        <div>
          <Button bsStyle="info" type="submit" value="Submit">
            Login
          </Button>
        </div>
      </form>

        <Signup {...this.props} />
      </div>
    );
  }
}

export default Login;
