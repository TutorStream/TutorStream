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
      user_id : null,
      Tutors: []
  }
  this.getTutors = this.getTutors.bind(this);
}

  getTutors () {
    axios.get('/tutors')
    .then(({data}) => {
      console.log('what data returns herre ', data);
      this.setState({
        Tutors : data
      }, () => {
        console.log('tutor data within student view ', this.state.Tutors);
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getTutors();
  }

  render() {
  
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
              component={route.main}
            />
          ))}
      </div>
    </Router>
    )
  }
}


export default StudentView;