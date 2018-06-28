import React from 'react'
import axios from 'axios';

import $ from 'jquery';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name : '',
      Password: '',
      Email: '',
      userTests: [],
      Tutor: 0,
      Bio: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
    this.handleIsTutorChange = this.handleIsTutorChange.bind(this);
    this.handleTestsChange = this.handleTestsChange.bind(this);
  }

  inputHandler (e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleIsTutorChange (e) {
    this.setState({
      Tutor : e.target.value
    })
  }

  handleTestsChange (e) {
    var options = e.target.options;
    var selectedTests = [];
    for(var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTests.push(Number(options[i].value));
      }
    }
    this.setState({
      userTests : selectedTests
    });
  }

  handleSignup (e) {
    this.props.history.push('/student')
    e.preventDefault();
    axios.post('/users/signup', {
      Name : this.state.Name,
      Password: this.state.Password,
      Email: this.state.Email,
      Tests: this.state.userTests,
      Tutor: this.state.Tutor,
      Bio: this.state.Bio
    })
    .then(({data}) => {
      // no need to set state, just redirect to login page (auto login?)
      // auto login
      console.log(data2)
      this.clearInputs(); // just clears input
      this.props.history.push('/student')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  clearInputs () {
    $('.signup-input').val('');
  }

  render () {
    return (
      <div>
        <div>
          <span>Welcome! Please input your information below</span>
        </div>
        <br></br>
        <form className="" onSubmit={(e) => {this.handleSignup(e)}}>
          <label>Name: </label>
          <input className="signup-input" name="Name" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Password: </label>
          <input className="signup-input" name="Password" type="password" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Email: </label>
          <input className="signup-input" name="Email" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Tests (separate by space): </label>
          {/*can create a separate box where all selected tests are added to*/}
          <select onChange={(e) => {this.handleTestsChange(e)}} multiple>
            {this.props.Tests.map((test, i) => {
              return <option key={i} value={test.ID}>{test.Name}</option>
            })}
          </select>
          <br></br>
          <label>Tutor Profile: </label>
          <select value={this.state.Tutor} onChange={(e) => {this.handleIsTutorChange(e)}}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
          <br></br>
          <label>Bio: </label>
          <input className="signup-input" name="Bio" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <button type="submit" value="Submit">Create New Profile</button>
        </form>
      </div>
    )
  }
}


export default SignUp;