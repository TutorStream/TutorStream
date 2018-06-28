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
      user_id : null,
      Tutors: []
    }
    this.getSelectTutors = this.getSelectTutors.bind(this);
  }

  getSelectTutors () {
    // only return users that have tutor boolean as 1
    axios.get('/tutors', {
      params : {

      }
    })
    .then(({data}) => {
      this.setState({

      })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    // this.getSelectTutors();
  }

  render() {
    console.log(this.props.Tests, 'passed down tests to student view')
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