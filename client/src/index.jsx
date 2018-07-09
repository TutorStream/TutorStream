import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* Import Components */

// import Login from './components/Login.jsx';
import Classroom from './components/Classroom.jsx';
import Sessions from './components/Sessions.jsx';
import Settings from './components/Settings.jsx';
import TestList from './components/TestList.jsx';
import TutorRegistration from './components/TutorRegistration.jsx';
import TutorReview from './components/TutorReview.jsx';
import SecretRoute from './SecretRoute.jsx';
import Home from './components/Home.jsx';
import StudentView from './components/StudentView.jsx';
import TestProfile from './components/TestProfile.jsx';
import TutorProfile from './components/TutorProfile.jsx';
// import Chat from './components/Chat.jsx';
import Review from './components/Review.jsx';

/* Import Services */
import AuthService from './Auth/AuthService.js';
import AuthStatus from './Auth/AuthStatus.js';

/* Lazy Loaders */
// import DynamicImport from './DynamicImport.js';

class DynamicImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component : null
    }
  }

  componentWillMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => {
          component : component.default ? component.default : component
        })
      })
  }

  render () {
    return this.props.children(this.state.component)
  }
};

const login = () => (
  <DynamicImport load={() => import('./components/Login.jsx')}>
    {(Component) => {
      Component === null
      ? <p>Loading...</p>
      : <Component 
          {...routerProps} 
          tests={this.state.tests}
          id={this.state.id}
          getID={this.getID}
        />
    }}
  </DynamicImport>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      tests: [],
      tutors: []
    };
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
    this.getTutors = this.getTutors.bind(this);
    this.getSelectTutors = this.getSelectTutors.bind(this);
  }
  

  getID(id) {
    this.setState({
      id: id
    });
  }

  getAllTests() {
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
  }

  getTutors() {
    axios
      .get('/tutors')
      .then(({ data }) => {
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error('There was an error getting all the tutors: ', err);
      });
  }

  getSelectTutors() {
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
  }

  componentDidMount() {
    this.getTutors();
    this.getAllTests();
  }

  render() {
    return (
      <div>
        <Navbar style={{ fontSize: `130%` }}>
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
            {/* <LinkContainer to={'/chat'}>
              <NavItem>All Chats</NavItem>
            </LinkContainer> */}
            <LinkContainer to="/classroom">
              <NavItem>Classroom</NavItem>
            </LinkContainer>
            <LinkContainer to="/tutor">
              <NavItem>Become a Tutor</NavItem>
            </LinkContainer>
            <LinkContainer to="/settings">
              <NavItem>Settings</NavItem>
            </LinkContainer>
            <AuthStatus />
          </Nav>
        </Navbar>
  {/*TESTING FOR LIVE CHAT*/}
   {/* < Chat /> */}
  {/*TESTING FOR LIVE CHAT*/}
        <Route
          exact
          path="/"
          render={routerProps => <Home {...routerProps} id={this.state.id} />}
        />
        {/* <Route
          path="/login"
          render={routerProps => (
            <Login
              className="login"
              tests={this.state.tests}
              {...routerProps}
              id={this.state.id}
              getID={this.getID}
            />
          )}
        /> */}
        <Route path="/login"
          render={login}
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
            <Sessions {...routerProps} id={this.state.id} />
          )}
        />
        {/* <SecretRoute 
          path='/chat' 
          render={(routerProps) => (
            <Chat {...routerProps} 
            id={this.state.id} 
            />
          )}
        /> */}
        <SecretRoute
          path="/classroom"
          render={routerProps => (
            <Classroom
              {...routerProps}
              setTestID={this.setTestID}
              id={this.state.id}
            />
          )}
        />
        <SecretRoute
          path="/tutor"
          render={routerProps => (
            <TutorRegistration
              {...routerProps}
              setTestID={this.setTestID}
              id={this.state.id}
            />
          )}
        />
        <SecretRoute
          path="/settings"
          render={routerProps => (
            <Settings
              {...routerProps}
              setTestID={this.setTestID}
              id={this.state.id}
            />
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App location={location} />
  </Router>,
  document.getElementById('app')
);
export default App;
