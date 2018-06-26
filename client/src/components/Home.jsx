import React from 'react';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup : false,
      showLogin: false
    }
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler (e) {
    this.setState({
      [e.target.name] : !this.state[e.target.name]
    })
  }

  render () {
    return (
      <div>
        {this.state.showSignup
        ? 
        <div>
          Create Profile:
          <SignUp />
        </div>
        :
        this.state.showLogin
        ?
        <div>
          Login Here:
          <Login />
        </div>
        :
        <div>
          <div>Home Page</div>
          <div>
            <label>Login</label>
            <br></br>
            <button name="showLogin" onClick={(e) => {this.buttonHandler(e)}}>login</button>
          </div>
          <div>
            <label>Create Profile</label>
            <br></br>
            <button name="showSignup" onClick={(e) => {this.buttonHandler(e)}}>create profile!</button>
          </div>
        </div>
        }
      </div>
    )
  }
}


export default Home;