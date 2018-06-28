import React from 'react';
import axios from 'axios';
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