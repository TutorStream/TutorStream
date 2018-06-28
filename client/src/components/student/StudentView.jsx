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
    }
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