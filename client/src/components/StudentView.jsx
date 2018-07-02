import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import axios from 'axios';

import TutorProfile from './TutorProfile.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class StudentView extends Component {
  constructor(props){
    super(props);
    this.state = {
      // id : this.props.userId,
      test_id : 1,
      tutorId : null,
      // Tutors: []
    }
    // this.getTutors = this.getTutors.bind(this);
    this.setTestID = this.setTestID.bind(this);
    this.grabTutorId = this.grabTutorId.bind(this);
    // this.getSelectTutors = this.getSelectTutors.bind(this);
  }

  getTutors () {
    axios.get('/tutors')
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
        test_id : this.state.test_id
      }
    })
    .then(({data}) => {
      this.setState({
        Tutors : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  setTestID (id) {
    this.setState({
      test_id : id
    }, () => {
      this.getSelectTutors();
    })
  }

  grabTutorId(id){
    this.setState({
      tutorId : id
    })
  }

  componentDidMount() {
    console.log('user id is in those props: ? ', this.props)
    this.getTutors();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('updating')
  }

  render() {
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
                <LinkContainer to={`/sessions/${this.state.id}`}>
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
                render={(routerProps) => <route.main {...routerProps} setTestID={this.setTestId} id={this.state.id} onClick={() => { this.props.history.push(route.path) }}/> }
              />
            ))}
            <div className="tutors-container">
              <div className="all-tutors">
                {this.state.Tutors.map((tutor, i) => {
                  return (
                    <div className="indv-tutor" onClick={()=>{this.grabTutorId(tutor.ID)}} key={i}>
                      <Link to={`/tutor/${tutor.ID}`}>
                      <span className="tutor-name">{tutor.Name}</span>
                      </Link>
                      <br></br>
                        <div>Bio: {tutor.Bio}</div>
                      <br></br>
                      <br></br>
                        <div>Rating: {tutor.Rating}</div>
                      <br></br>
                      <br></br>
                        <div>Price: {tutor.Price}</div>
                      <br></br>
                    </div>
                  )
                })}
              </div> 
            </div>
            <Route exact path ='/tutor/:ID' render = {(routerProps)=> {
              return (
                  <TutorProfile 
                  tutor_id={this.state.tutorId} 
                  id={this.state.id} 
                  test_ID={this.state.test_id} 
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