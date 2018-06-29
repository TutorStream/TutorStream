import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Sessions from './Sessions.jsx';
import Classroom from '../communication/Classroom.jsx';
import Settings from '../Settings.jsx';
import TutorRegistration from './TutorRegistration.jsx';
import TestList from './TestList.jsx';
import TutorProfile from './TutorProfile.jsx';
import BookSession from "./BookSession.jsx";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class StudentView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      routes:[
              {
                  path: "/student",
                  main: TestList
              },
              {
                path: "/sessions",
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
                path: "/booksession",
                main: BookSession
              }
      ],
      user_id : this.props.ID,
      test_ID : 88,
      Tutors: [],
      tutorId : null
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

  render() {
    // console.log('state test id and user id', [this.state.user_id, this.state.test_ID]);
    // console.log('this.state.Tutors', this.state.Tutors);
    return (
      <div>
        <Router>
          <div> 
              <ul>
                <Navbar>
                  <Nav>
                  <LinkContainer to="/sessions">
                    <NavItem>Sessions</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/classroom">
                    <NavItem>ClassRoom</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                
                  <LinkContainer to="/becometutor">
                    <NavItem>Become a Tutor</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/booksession">
                    <NavItem>Book a Session</NavItem>
                  </LinkContainer>
                  </Nav>
                </Navbar>
              </ul>
              {this.state.routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(routerProps) => <route.main {...routerProps} setTestID={this.setTestID} user_id={this.state.user_id}/> }
                />
              ))}
              <div className="tutors">
                <ul>
                {this.state.Tutors.map((tutor, i) => {
                  return <li onClick={()=>{this.grabTutorId(tutor.ID)}} key={i}><Link to={`/tutor/${tutor.ID}`}>{tutor.Name}</Link></li>
                })}
                </ul>
              <Route path ='/tutor/:ID' render = {(routerProps)=>{return <TutorProfile tutor_id={this.state.tutorId} user_id = {this.state.user_id} test_ID={this.state.test_ID} {...routerProps}/>}} />
           </div>
               
          </div>
          
        </Router>
     </div>
    )
  }
}

export default StudentView;