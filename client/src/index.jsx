import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* Import Components */
import StudentView from './components/StudentView.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Classroom from './components/Classroom.jsx'
import Sessions from './components/Sessions.jsx'
import Settings from './components/Settings.jsx'
import TestList from './components/TestList.jsx'
import TutorProfile from './components/TutorProfile.jsx'
import TutorRegistration from './components/TutorRegistration.jsx'
import TutorReview from './components/TutorReview.jsx'
import SecretRoute from './SecretRoute.jsx'

/* Import Services */

import AuthService from './Auth/AuthService.js'
import AuthStatus from './Auth/AuthStatus.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID : null,
      Tests: []
    }
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getID (ID) {
    this.setState({
      ID : ID
    })
  }

  getAllTests () {
    axios.get('/tests', {
      params : {
        user_id : this.state.ID
      }
    })
    .then(({data}) => {
      this.setState({
        Tests : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getAllTests();
  }

  render() {
    return (
      <div>
        <Navbar style={{ fontSize: `130%` }}>
          <Nav>
            <LinkContainer to={"/home"}>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to={`/sessions/${this.state.user_id}`}>
              <NavItem>Sessions</NavItem>
            </LinkContainer>
            <LinkContainer to="/classroom">
              <NavItem>ClassRoom</NavItem>
            </LinkContainer>
            <LinkContainer to="/tutor">
              <NavItem>Become a Tutor</NavItem>
            </LinkContainer>
            <LinkContainer to="/settings">
              <NavItem>Settings</NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Route path='/home' render={(routerProps) => (<TestList {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id} />)}></Route>
        <Route path='/login' render={(routerProps) => (<Login className='login' {...routerProps} ID={this.state.ID} getID={this.getID}/>)}></Route>
        <SecretRoute path='/sessions/:id' render={(routerProps) => (<Sessions {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id}/>)}></SecretRoute>
        <SecretRoute path='/classroom' render={(routerProps) => (<Classroom {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id}/>)}></SecretRoute>
        <SecretRoute path='/tutor' render={(routerProps) => (<TutorRegistration {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id}/>)}></SecretRoute>
        <SecretRoute path='/settings' render={(routerProps) => (<Settings {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id}/>)}></SecretRoute>

      </div>
    )
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('app'))
export default App;