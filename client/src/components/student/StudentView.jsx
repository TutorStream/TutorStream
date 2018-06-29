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
    console.log('state test id and user id', [this.state.user_id, this.state.test_ID]);
    console.log('this.state.Tutors', this.state.Tutors);
    return (
      <div>
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
              <div className="tutors">
                <ul>
                {this.state.Tutors.map((tutor, i) => {
                  return <li onClick={()=>{this.grabTutorId(tutor.ID)}} key={i}><Link to={`/tutor/${tutor.ID}`}>{tutor.Name}</Link></li>
                })}
                </ul>
              <Route path ='/tutor' render = {()=>{return <TutorProfile tutor_id={this.state.tutorId} user_id = {this.state.user_id} test_ID={this.state.test_ID}/>}} />
           </div>
               
          </div>
          
        </Router>
     </div>
    )
  }
}


export default StudentView;