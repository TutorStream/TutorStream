import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';
import Sessions from './Sessions.jsx';
import Classroom from './Classroom.jsx';
import Settings from './Settings.jsx';
import TutorRegistration from './TutorRegistration.jsx';
import TestList from './TestList.jsx';
import TutorProfile from './TutorProfile.jsx';
import Main from '../index.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class StudentView extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id : this.props.ID,
      test_ID : 1,
      tutorId : null,
      Tutors: []
    }
    this.getTutors = this.getTutors.bind(this);
    this.setTestID = this.setTestID.bind(this);
    this.grabTutorId = this.grabTutorId.bind(this);
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

  setTestID (ID) {
    this.setState({
      test_ID : ID
    })
  }

  grabTutorId(ID){
    this.setState({
      tutorId : ID
    })
  }

  componentDidMount() {
    this.getTutors();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('updating')
  }

  render() {
    // console.log('state test id and user id', [this.state.user_id, this.state.test_ID]);
    // console.log('this.state.Tutors', this.state.Tutors);
    console.log(this.props)
    return (
      <div>
        <Router>
          <div> 
              <ul>
                <Navbar style={{ fontSize: `130%` }}>
                  <Nav>
                  <LinkContainer to={"/student"}>
                    <NavItem>Home</NavItem>
                  </LinkContainer>
                  <LinkContainer to={`/sessions/${this.state.user_id}`}>
                    <NavItem>Sessions</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/classroom">
                    <NavItem>ClassRoom</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/becometutor">
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
              </ul>

              <div className="tutors">
                <ul>
                {this.state.Tutors.map((tutor, i) => {
                  return <li onClick={()=>{this.grabTutorId(tutor.ID)}} key={i}><Link to={`/tutor/${tutor.ID}`}>{tutor.Name}</Link></li>
                })}
                </ul>
              </div> 
              <Switch>
              {this.state.routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  // render={(props) => <route.main setTestID={this.setTestID} {...props}/> }
                  render={(routerProps) => <route.main {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id} onClick={() => { this.props.history.push(route.path) }}/> }
                />
              ))}
              <Route exact path ='/tutor/:ID' render = {(routerProps)=> {
                return (
                   <TutorProfile 
                   tutor_id={this.state.tutorId} 
                   user_id={this.state.user_id} 
                   test_ID={this.state.test_ID} 
                   {...routerProps}
                   />
                )}}/>
              </Switch>
          
          </div>
        </Router>
      </div>
    )
  }
}

export default StudentView;