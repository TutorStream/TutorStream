<<<<<<< HEAD
import React from 'react';
import Sidebar from '../Sidebar.jsx';
import Sessions from './Sessions.jsx';
import {BrowserRouter} from 'react-router-dom';
import TestList from './TestList.jsx';
=======
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sessions from './Sessions.jsx'
import Classroom from '../communication/Classroom.jsx'
import Settings from '../Settings.jsx'
import TutorRegistration from './TutorRegistration.jsx'
>>>>>>> 29c1672d04716227ce15f50e21f94daa3029b229


class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          routes:[
                {
                  path: "/sessions",
                  main: Sessions
                },
                {
                  path: "/classroom",
                  main: Classroom
                },
                {
                  path: "/settings",
                  main: Settings
                },
                {
                  path: "/becometutor",
                  main: TutorRegistration
                }
            ]};
      }
    render() {
      
        return (
<<<<<<< HEAD
            <div className='student-main'>
                <Sidebar options = {this.state.options} /> 
                <div>
                <h1>Student View</h1>
                <br/><br/>
                <TestList />
                    <div className='student-view'>
                        <h2>Main Page</h2>
                    </div>
                
                <hr/>
                </div>
            </div>
=======
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
>>>>>>> 29c1672d04716227ce15f50e21f94daa3029b229
        )
    }
}


export default StudentView;