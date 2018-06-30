import React from 'react';
import axios from 'axios';
import { FormGroup, FormControl, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email: '',
      password: '',
      userTests: [],
      bio: '',
      tutor: 0,
      photo: null,
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleIsTutorChange = this.handleIsTutorChange.bind(this);
    this.handleTestSelect = this.handleTestSelect.bind(this);
  }

  inputHandler (e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  handleIsTutorChange (e) {
    this.setState({
      tutor : e.target.value
    });
  }

  handleTestSelect (e) {
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

  handleSignup (e) {
    e.preventDefault();
    axios.post('/users/signup', {
      name : this.state.name,
      password: this.state.password,
      email: this.state.email,
      tests: this.state.userTests,
      tutor: this.state.tutor,
      bio: this.state.bio
    })
    .then(({data}) => {
      // this.props.history.push('/home');
      // push to appropriate page
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render () {
    return (
      <div>
        <div>
          <h4>Create a Profile :</h4>
        </div>
        <form onSubmit={(e) => this.handleSignup(e)}>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Name :</ControlLabel>
            <FormControl type="text" placeholder="Enter your name here" name="name" onChange={(e) => this.inputHandler(e)}/>
          </FormGroup>
          <FormGroup controlId="formControlsEmail">
            <ControlLabel>Email :</ControlLabel>
            <FormControl type="email" placeholder="Enter your email address here" name="email" onChange={(e) => this.inputHandler(e)}/>
          </FormGroup>
          <FormGroup controlId="formControlsPassword">
            <ControlLabel>Password :</ControlLabel>
            <FormControl type="password" placeholder="Enter your password here" name="password" onChange={(e) => this.inputHandler(e)}/>
          </FormGroup>
          <FormGroup >
            <ControlLabel>Exams you're interested in :</ControlLabel><div></div>
            { this.props.tests.map((test, index) => 
              <Checkbox inline key={test.ID} value={test.ID} name={test.Name} onClick={(e) => this.handleTestSelect(e)}>{test.Name}</Checkbox>
            )}
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Bio :</ControlLabel>
            <FormControl componentClass="textarea" maxLength='255' placeholder="Tell us about yourself" name="bio" onChange={(e) => this.inputHandler(e)}/>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Interested in tutoring? :</ControlLabel>
            <FormControl componentClass="select" name="tutor" onChange={(e) => {this.handleIsTutorChange(e)}}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </FormControl>
          </FormGroup>
          {/* need to connect this file upload input with upload function & service */}
          <FormGroup controlId="formControlsFile">
            <ControlLabel>Upload your profile picture :</ControlLabel>
            <FormControl type="file" name="photo"/>
          </FormGroup>
          <Button type="submit">Save Profile</Button>
        </form>

      </div>
    )
  }
}

export default SignUp;