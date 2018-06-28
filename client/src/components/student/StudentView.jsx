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
                {name :'student/becomeTutor'}
            ]
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