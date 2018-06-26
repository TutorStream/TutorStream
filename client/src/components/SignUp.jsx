import React from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Router, Link, Switch, Redirect} from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password: '',
      email: '',
      tests: [],
      isTutor: false,
      bio: ''
    }
    // bind funcs here, OR just use arrow funcs?
    // this.returnToHomepage = this.returnToHomepage.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }
  inputHandler (e) {
    this.setState({
      [e.event.name] : e.target.value
    })
  }
  render () {
    const returnToHomepage = () => {
      return (
        <div>
          <Link to="/">Home</Link>
        </div>
      )
    };
    return (
      <div>
        <div className="homepage-btn">
          <button onClick={() => {returnToHomepage()}}>Home</button>
          {/*return to homepage button*/}
        </div>
        <div>
          <span>Welcome! Please input your information below</span>
        </div>
        <br></br>
        <form className="">
          <label>Username</label>
          <input name="username" onChange={() => {this.inputHandler()}}></input>
          <br></br>
          <label>Password</label>
          <input name="password" onChange={() => {this.inputHandler()}}></input>
          <br></br>
          <label>Email</label>
          <input></input>
          <br></br>
          <label>Tests (separate by space)</label> {/*can this be an autocomplete drop down box?*/}
          <input name="tests" onChange={() => {this.inputHandler()}}></input>
          <br></br>
          <label>Tutor Profile</label> {/*should be a boolean? how to address this*/}
          <input></input>
          <br></br>
          <button type="submit" value="Submit"></button>
        </form>
      </div>
    )
  }
}


export default SignUp;