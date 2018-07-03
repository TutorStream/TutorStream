import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
} from 'react-bootstrap';
import AuthService from '../Auth/AuthService';
import { Redirect } from 'react-router-dom';
import { validate } from 'isemail';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      userTests: [],
      bio: '',
      tutor: 0,
      photo: null,
      redirectToPreviousRoute: false
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleTestSelect = this.handleTestSelect.bind(this);
  }

  inputHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTestSelect(e) {
    let newTests = this.state.userTests.slice();
    if (e.target.checked) {
      newTests.push(e.target.value);
    } else {
      newTests.splice(newTests.indexOf(e.target.value), 1);
    }
    this.setState({
      userTests: newTests
    });
  }

  handleSignup(e) {
    e.preventDefault();
    axios
      .post('/users/signup', {
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        tests: this.state.userTests,
        tutor: this.state.tutor,
        bio: this.state.bio
      })
      .then(({ data }) => {
        AuthService.authenticate();
        this.setState({
          redirectToPreviousRoute: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <div>
          <h4>Create a Profile :</h4>
        </div>
        <form onSubmit={e => this.handleSignup(e)}>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Name :</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter your name here"
              name="name"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup controlId="formControlsEmail">
            <ControlLabel>Email :</ControlLabel>
            <FormControl
              type="email"
              placeholder="Enter your email address here"
              name="email"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup controlId="formControlsPassword">
            <ControlLabel>Password :</ControlLabel>
            <FormControl
              type="password"
              placeholder="Enter your password here"
              name="password"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Exams you're interested in :</ControlLabel>
            <div />
            {this.props.tests.map((test, index) => (
              <Checkbox
                inline
                key={test.ID}
                value={test.ID}
                name={test.Name}
                onClick={e => this.handleTestSelect(e)}
              >
                {test.Name}
              </Checkbox>
            ))}
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Bio :</ControlLabel>
            <FormControl
              componentClass="textarea"
              maxLength="255"
              placeholder="Tell us about yourself"
              name="bio"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          {/* need to connect this file upload input with upload function & service */}
          <FormGroup controlId="formControlsFile">
            <ControlLabel>Upload your profile picture :</ControlLabel>
            <FormControl type="file" name="photo" />
          </FormGroup>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
