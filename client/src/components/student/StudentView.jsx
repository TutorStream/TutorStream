import React from 'react';
import Sidebar from '../Sidebar.jsx'
import Sessions from './Sessions.jsx'
import {BrowserRouter} from 'react-router-dom'


class StudentView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options : [
        {name :'student/sessions'},
        {name :'student/classroom'},
        {name :'student/becomeTutor'},
        {name :'student/setting'},
      ],
      Tests : [
        {ID: 1, Name: 'DAT', Description: 'dental school test'},
        {ID: 2, Name: 'LSAT', Description: 'law school test'},
        {ID: 3, Name: 'SAT', Description: 'high school test'},
        {ID: 4, Name: 'GRE', Description: 'grad school regular test'},
        {ID: 5, Name: 'GMAT', Description: 'grad school business test'},
        {ID: 6, Name: 'Hack Reactor T A', Description: 'smartest ppl alive test'}
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
    .then(({data}) => {
      console.log('should be users tests', data);
      this.setState({
        selectedTests : data
      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getSelectTutors () {
    // only return users that have tutor boolean as 1
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