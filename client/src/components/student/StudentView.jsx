import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Sessions from './Sessions.jsx';
import Classroom from '../communication/Classroom.jsx';
import Settings from '../Settings.jsx';
import TutorRegistration from './TutorRegistration.jsx';
import TestList from './TestList.jsx';

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
                main: Sessions
              },
              {
                path: "/classroom",
                main: Classroom
              },
              {
                path: "/becometutor",
                main: TutorRegistration
              },
              {
                path: "/settings",
                main: Settings
              }
      ],
      user_id : this.props.ID,
      test_ID : null,
      Tutors: []
  }
  this.getTutors = this.getTutors.bind(this);
  this.setTestID = this.setTestID.bind(this);
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

  componentDidMount() {
    this.getTutors();
  }

  render() {
    console.log('state test id and user id', [this.state.user_id, this.state.test_ID]);
    console.log('this.state.Tutors', this.state.Tutors);
    return (
      <Router>
      <div> 
          <ul>
            <li>
              <Link to="/sessions">Sessions</Link>
            </li>
            <li>
              <Link to="/classroom">Classroom</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/becometutor">Become a Tutor</Link>
            </li>
          </ul>
          {this.state.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={() => <route.main setTestID={this.setTestID}/> }
            />
          ))}
      </div>
    </Router>
    )
  }
}


export default StudentView;