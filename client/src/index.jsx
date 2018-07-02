import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* Import Components */

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
      id : null,
      tests: [],
      test_ID : 1,
      tutorId : null,
      Tutors: []
    }
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
    this.getTutors = this.getTutors.bind(this);
    this.setTestID = this.setTestID.bind(this);
    this.grabTutorId = this.grabTutorId.bind(this);
    this.getSelectTutors = this.getSelectTutors.bind(this);
  }

  getID (id) {
    this.setState({
      id : id
    })
  }

  getAllTests () {
    axios.get('/tests', {
      params : {
        id : this.state.id
      }
    })
    .then(({data}) => {
      this.setState({
        tests : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  getTutors () {
    axios.get('/users/tutors')
    .then(({data}) => {
      this.setState({
        Tutors : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }
  getSelectTutors() {
    axios.get('/tutors/selectTutors',{
      params : {
        test_id : this.state.test_ID
      }
    })
    .then(({data}) => {
      console.log('waht is this data', data);
      this.setState({
        Tutors : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  setTestID (ID) {
    this.setState({
      test_ID : ID
    }, () => {
      this.getSelectTutors();
    })
  }
  grabTutorId(ID){
    this.setState({
      tutorId : ID
    })
  }

  componentDidMount() {
    this.getAllTests();
    this.getTutors();
  }

  render() {
    return (
      <div>
        
        <Navbar style={{ fontSize: `130%` }}>
          <Nav>
            <LinkContainer to={"/home"}>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to={`/sessions/${this.state.id}`}>
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
          </Nav>
        </Navbar>
        <AuthStatus />

        <Route path='/home' render={(routerProps) => (<TestList {...routerProps} setTestID={this.setTestID} id={this.state.id} />)}></Route>
        <Route path='/login' render={(routerProps) => (<Login className='login' {...routerProps} ID={this.state.ID} getID={this.getID}/>)}></Route>
        <SecretRoute path='/sessions/:id' render={(routerProps) => (<Sessions {...routerProps} setTestID={this.setTestID} id={this.state.id}/>)}></SecretRoute>
        <SecretRoute path='/classroom' render={(routerProps) => (<Classroom {...routerProps} setTestID={this.setTestID} id={this.state.id}/>)}></SecretRoute>
        <SecretRoute path='/tutor' render={(routerProps) => (<TutorRegistration {...routerProps} setTestID={this.setTestID} id={this.state.id}/>)}></SecretRoute>
        <SecretRoute path='/settings' render={(routerProps) => (<Settings {...routerProps} setTestID={this.setTestID} id={this.state.id}/>)}></SecretRoute>
      </div>
    )
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('app'))
export default App;