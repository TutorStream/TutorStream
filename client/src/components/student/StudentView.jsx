import React from 'react';
import Sidebar from '../Sidebar.jsx'
import Sessions from './Sessions.jsx'
import {Route} from 'react-router-dom'


class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'student/sessions'},
                {name :'student/classroom'},
                {name :'student/becomeTutor'},
                {name :'student/setting'},
            ]
        }
    }

    render() {
        return (
            <div className='student-main'>
                <Sidebar options = {this.state.options} /> 
                
                <h1>Student View</h1>
                <br/><br/>              
                    <div className='student-view'>
                        <h2>Main Page</h2>
                    </div>
                <hr/>
                <Route exact path = "/student/sessions" component={Sessions}></Route>
              <Route exact path = "/student/classroom" component={StudentView}></Route>
              <Route exact path = "/student/becomeTutor" component={TutorRegistration}></Route>
              <Route exact path = "/student/setting" component={Settings}></Route>
            </div>
       
        )
    }
}


export default StudentView;