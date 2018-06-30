import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';
import Sessions from './Sessions.jsx';
import Classroom from '../communication/Classroom.jsx';
import Settings from '../Settings.jsx';
import TutorRegistration from './TutorRegistration.jsx';
import TestList from './TestList.jsx';
import TutorProfile from './TutorProfile.jsx';
import Main from './../../index.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class StudentView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      routes:[
              {
                  path: "/student",
                  exact: true,
                  main: TestList
              },
              {
                path: "/sessions/:id",
                exact: true,
                main: Sessions
              },
              {
                path: "/classroom",
                exact: true,
                main: Classroom
              },
              {
                path: "/becometutor",
                exact: true,
                main: TutorRegistration
              },
              {
                path: "/settings",
                exact: true,
                main: Settings
              },
              {
                path: "/logout",
                exact: true,
                main: Main
              }
      ],
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
    console.log(this.state.Tutors);
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
            {this.state.routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(routerProps) => <route.main {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id} onClick={() => { this.props.history.push(route.path) }}/> }
              />
            ))}
            <div className="tutors-container">
              <div className="all-tutors">
                <ul>
                {this.state.Tutors.map((tutor, i) => {
                  return (
                    <div className="indv-tutor" onClick={()=>{this.grabTutorId(tutor.ID)}} key={i}>
                      <Link to={`/tutor/${tutor.ID}`}>
                      {tutor.Name}
                      </Link>
                      {/*other tutor data to render */}
                      <br></br>
                        <div>{tutor.Bio}</div>
                      <br></br>
                    </div>
                  )
                })}
                </ul>
              </div> 
            </div>
            <Route exact path ='/tutor/:ID' render = {(routerProps)=> {
              return (
                  <TutorProfile 
                  tutor_id={this.state.tutorId} 
                  user_id={this.state.user_id} 
                  test_ID={this.state.test_ID} 
                  {...routerProps}
                  />
              )}}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default StudentView;