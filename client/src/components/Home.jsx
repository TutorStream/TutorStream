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
    this.flipLoginHandler = this.flipLoginHandler.bind(this);
    this.flipSignupHandler = this.flipSignupHandler.bind(this);
    this.returnToHomepage = this.returnToHomepage.bind(this);
  }

  flipLoginHandler (e) {
    this.setState({
      // [e.target.name] : !this.state[e.target.name]
      showLogin : !this.state.showLogin,
      // showSignup : !this.state.showSignup
    })
  }
  flipSignupHandler (e) {
    this.setState({
      // [e.target.name] : !this.state[e.target.name]
      showSignup : !this.state.showSignup,
      // showLogin : !this.state.showLogin
    })
  }

  returnToHomepage () {
    this.setState({
      showSignup: false,
      showLogin : false
    })
  }

  render () {
    return (
      <div>
        <div>
          <button onClick={this.props.handleSwitchView} name= 'goToStudent'>Student View</button>
          <button onClick={this.props.handleSwitchView} name= 'tutorHome'>Tutor Home</button>
          <h1>Home Page</h1>
        </div>
        <div>
          {this.state.showSignup
          ? 
          <div>
<<<<<<< HEAD
            Create Profile:
            <SignUp returnToHomepage={this.returnToHomepage}/>
=======
            <button onClick={this.props.handleSwitchView} name= 'student'>Student View</button>
            <button onClick={this.props.handleSwitchView} name= 'tutorHome'>Tutor Home</button>
            <h1>Home Page</h1>
>>>>>>> 8550a75d611d560651b0eb0989986cd095098d37
          </div>
          :
          this.state.showLogin
          ?
          <div>
            Access Account
            <Login returnToHomepage={this.returnToHomepage}/>
          </div>
          :
          <div>
            <div>Home Page</div>
            <div>
              <label>Access Account</label>
              <br></br>
              <button name="showLogin" onClick={(e) => {this.flipLoginHandler(e)}}>login</button>
            </div>
            <br></br>
            <div>
              <label>Create Profile</label>
              <br></br>
              <button name="showSignup" onClick={(e) => {this.flipSignupHandler(e)}}>create profile!</button>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}


export default Home;