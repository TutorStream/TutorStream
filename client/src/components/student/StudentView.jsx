import React from 'react';
import Sidebar from '../Sidebar.jsx'
import Sessions from './Sessions.jsx'
import {BrowserRouter} from 'react-router-dom'


class StudentView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options : [
          {name :'All Sessions', func : 'tutor'},
          {name :'Inbox', func : 'tutor'},
          {name :'Classroom', func : 'tutor'},
          {name :'Become a Tutor', func : 'tutor'},
      ],
      user_id : null,
      selectedTests: [],
      selectedTutors: []
    }
    this.sessions = this.sessions.bind(this);
    this.inbox = this.inbox.bind(this);
    this.tutor = this.tutor.bind(this);
    this.classroom = this.classroom.bind(this);
    this.getUserTests = this.getUserTests.bind(this);
    this.getSelectTutors = this.getSelectTutors.bind(this);
  }

  getUserTests () {
    axios.get('/users/tests', {
      params : {
        user_id : this.state.user_id
      }
    })
  }

  getSelectTutors () {

  }

  componentDidMount() {
    // need to get ALL tests AND ALL tutors here
    // OR --> only get all tutors for whatever tests
    // then filter accordingly based on whatever tests the user has set
    // view needs to be sidebar, all best tutors of the seleected tests, then a drop-down
    // to filter tests 
    this.getTests();
    this.getTutors();
  }


    render() {
        return (
            <div className='student-main'>
                <Sidebar options = {this.state.options} /> 
                <div>
                <h1>Student View</h1>
                <br/><br/>
          
                                   
                    <div className='student-view'>
                        <h2>Main Page</h2>
                    </div>
                
                <hr/>
                </div>
            </div>
       
        )
    }
}


export default StudentView;