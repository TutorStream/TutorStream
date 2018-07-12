import React from 'react';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
} from 'react-bootstrap';
import AuthService from './../../Auth/AuthService';
import { Redirect } from 'react-router-dom';

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    userTests: [],
    bio: '',
    tutor: 0,
    selectedFile: [],
    redirectToPreviousRoute: false
  };

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleTestSelect = e => {
    let newTests = this.state.userTests.slice();
    if (e.target.checked) {
      newTests.push(e.target.value);
    } else {
      newTests.splice(newTests.indexOf(e.target.value), 1);
    }
    this.setState({
      userTests: newTests
    });
  };

  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files
    });
  };

  handleFileUpload = user_id => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile[0]);
    axios
      .post(
        'http://ec2-34-207-66-224.compute-1.amazonaws.com:5000/photo-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            crossDomain: true
          }
        }
      )
      .then(({ data }) => {
        let userPhoto = {
          user_id,
          location: data.Location
        };
        axios.post('/users/photo', userPhoto);
      })
      .catch(error =>
        console.error(
          'There was an error with the POST request to the server: ',
          error
        )
      );
  };

  handleSignup = e => {
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
        this.handleFileUpload(data);
      })
      .then(() => {
        AuthService.authenticate();
        this.setState({
          redirectToPreviousRoute: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <div>
          <h4 className="title">
            <strong>Create a Profile:</strong>
          </h4>
        </div>
        <form onSubmit={e => this.handleSignup(e)}>
          <FormGroup bsClass="login-form" controlId="formControlsText">
            <ControlLabel>Name :</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter your name here"
              name="name"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup bsClass="login-form" controlId="formControlsEmail">
            <ControlLabel>Email :</ControlLabel>
            <FormControl
              type="email"
              placeholder="Enter your email address here"
              name="email"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup bsClass="login-form" controlId="formControlsPassword">
            <ControlLabel>Password :</ControlLabel>
            <FormControl
              type="password"
              placeholder="Enter your password here"
              name="password"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup bsClass="login-form" controlId="formCOntrolsTests">
            <ControlLabel>Exams you're interested in :</ControlLabel>
            <div />
            {this.props.tests.map((test, index) => (
              <Checkbox
                inline
                key={test.id}
                value={test.id}
                name={test.Name}
                onClick={e => this.handleTestSelect(e)}
              >
                {test.Name}
              </Checkbox>
            ))}
          </FormGroup>
          <FormGroup bsClass="login-form" controlId="formControlsTextarea">
            <ControlLabel>Bio :</ControlLabel>
            <FormControl
              componentClass="textarea"
              maxLength="255"
              placeholder="Tell us about yourself"
              name="bio"
              onChange={e => this.inputHandler(e)}
            />
          </FormGroup>
          <FormGroup bsClass="login-form" controlId="formControlsFile" encType="multipart/form-data">
            <ControlLabel>Upload your profile picture :</ControlLabel>
            <FormControl
              type="file"
              name="photo"
              onChange={this.handleFileSelect}
            />
          </FormGroup>
          <div>
            <Button bsStyle="info" controlId="btn" type="submit" value="Submit">
              Sign Up
            </Button>
          </div>
        </form>
       <br></br>
       <br></br>
      </div>
    );
  }
}

export default SignUp;
