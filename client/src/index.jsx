import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { HashRouter, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AuthStatus from './Auth/AuthStatus.js';
import Async from 'react-code-splitting';

const Login = props => (
  <Async
    load={import('./components/un-protected/Login.jsx')}
    componentProps={props}
  />
);
const TutorProfile = props => (
  <Async
    load={import('./components/protected/tutorView/TutorProfile.jsx')}
    componentProps={props}
  />
);
const Sessions = props => (
  <Async
    load={import('./components/protected/Sessions.jsx')}
    componentProps={props}
  />
);
const TestProfile = props => (
  <Async
    load={import('./components/un-protected/TestProfile.jsx')}
    componentProps={props}
  />
);
const Review = props => (
  <Async
    load={import('./components/protected/tutorView/Review.jsx')}
    componentProps={props}
  />
);
const Settings = props => (
  <Async
    load={import('./components/protected/Settings.jsx')}
    componentProps={props}
  />
);
const TestList = props => (
  <Async
    load={import('./components/un-protected/TestList.jsx')}
    componentProps={props}
  />
);
const Classroom = props => (
  <Async
    load={import('./components/protected/classroom/Classroom.jsx')}
    componentProps={props}
  />
);
const TutorRegistration = props => (
  <Async
    load={import('./components/protected/studentView/TutorRegistration.jsx')}
    componentProps={props}
  />
);
const TutorReview = props => (
  <Async
    load={import('./components/protected/TutorReview.jsx')}
    componentProps={props}
  />
);
const Home = props => (
  <Async
    load={import('./components/un-protected/Home.jsx')}
    componentProps={props}
  />
);
const StudentView = props => (
  <Async
    load={import('./components/protected/studentView/StudentView.jsx')}
    componentProps={props}
  />
);
const SecretRoute = props => (
  <Async load={import('./SecretRoute.jsx')} componentProps={props} />
);

class App extends Component {
  state = {
    id: 7,
    tests: [],
    tutors: [],
    isTutor: -1
  };

  componentDidMount() {
    this.getTutors();
    this.getAllTests();
  }

  getid = id => {
    this.setState({
      id: id
    });
  };

  checkTutorStatus = (id, tutors) => {
    if (tutors.indexOf(id) > -1) {
      this.setState({
        isTutor: 1
      });
    }
  };

  getAllTests = () => {
    axios
      .get('/tests')
      .then(({ data }) => {
        this.setState({
          tests: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  getTutors = () => {
    axios
      .get('/tutors')
      .then(({ data }) => {
        this.setState({
          tutors: data,
          tutors_ids: data.map(a => a.id)
        });
      })
      .catch(err => {
        console.error('There was an error getting all the tutors: ', err);
      });
  };

  getSelectTutors = () => {
    axios
      .get('/tutors/selectTutors', {
        params: {
          test_id: id
        }
      })
      .then(({ data }) => {
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let conditionalTitle =
      this.state.isTutor > -1 ? 'Earnings' : 'Become a Tutor';
    return (
      <div className="navigate">
        <Navbar
          style={{
            fontSize: `130%`,
            backgroundColor: 'transparent',
            zIndex: '99999999',
            color: 'white'
          }}
        >
          <Nav>
            <LinkContainer to={'/'}>
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to={'/findTutor'}>
              <NavItem>Find A Tutor</NavItem>
            </LinkContainer>
            <LinkContainer to={`/sessions/${this.state.id}`}>
              <NavItem>All Sessions</NavItem>
            </LinkContainer>
            <LinkContainer to="/classroom">
              <NavItem>Classroom</NavItem>
            </LinkContainer>
            <LinkContainer to="/tutor">
              <NavItem>{conditionalTitle}</NavItem>
            </LinkContainer>
            <LinkContainer to="/settings">
              <NavItem>Settings</NavItem>
            </LinkContainer>
            <AuthStatus />
          </Nav>
        </Navbar>
        <Route
          exact
          path="/"
          render={routerProps => <Home {...routerProps} id={this.state.id} />}
        />
        <Route
          path="/login"
          render={routerProps => (
            <Login
              className="login"
              tests={this.state.tests}
              testProps={this.state.tests}
              {...routerProps}
              id={this.state.id}
              tutors_ids={this.state.tutors_ids}
              getid={this.getid}
              checkTutorStatus={this.checkTutorStatus}
            />
          )}
        />
        <Route
          path="/tutors/:id"
          render={routerProps => (
            <TutorProfile {...routerProps} id={this.state.id} />
          )}
        />
        <Route
          path="/tests/:id"
          render={routerProps => (
            <TestProfile {...routerProps} id={this.state.id} />
          )}
        />
        <Route
          path="/review"
          render={routerProps => <Review {...routerProps} />}
        />
        <SecretRoute
          path="/findTutor"
          render={routerProps => (
            <StudentView
              {...routerProps}
              tests={this.state.tests}
              id={this.state.id}
            />
          )}
        />
        <SecretRoute
          path="/sessions/:id"
          render={routerProps => (
            <Sessions
              {...routerProps}
              id={this.state.id}
              tests={this.state.tests}
            />
          )}
        />
        <SecretRoute
          path="/classroom"
          render={routerProps => (
            <Classroom
              {...routerProps}
              setTestid={this.setTestid}
              id={this.state.id}
            />
          )}
        />
        <SecretRoute
          path="/tutor"
          render={routerProps => (
            <TutorRegistration
              {...routerProps}
              setTestid={this.setTestid}
              id={this.state.id}
              tutors_ids={this.state.tutors_ids}
              isTutor={this.state.isTutor}
            />
          )}
        />
        <SecretRoute
          path="/settings"
          render={routerProps => (
            <Settings
              {...routerProps}
              setTestid={this.setTestid}
              id={this.state.id}
            />
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <App location={location} />
  </HashRouter>,
  document.getElementById('app')
);
export default App;
