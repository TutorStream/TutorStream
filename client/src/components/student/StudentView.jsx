import React from 'react';
import Sidebar from '../Sidebar.jsx'
import { Route } from 'react-router-dom'

import Sessions from './Sessions.jsx'
import Classroom from '../communication/Classroom.jsx'
import TutorRegistration from './TutorRegistration.jsx'
import Settings from '../Settings.jsx'

const Session = (props) => {
    return (
        <h1>Something</h1>
    )
}

class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'sessions'},
                {name :'classroom'},
                {name :'becomeTutor'},
                {name :'setting'},
            ]
        }
    }

    render() {
        const {match} = this.props
        return (
            <div className='student-main'>  
                <div>
                    <Sidebar options = {this.state.options} {...this.props}/> 
                    <h1>Student View</h1>
                    <br/><br/>         
                        <div className='student-view'>
                            <h2>Main Page</h2>
                        </div>
                    <hr/>
                    <Route path = {`student/sessions`} component={Session}></Route>
                    <Route path = {`${match.path}/classroom`} component={Classroom}></Route>
                    <Route path = {`${match.path}/becomeTutor`} component={TutorRegistration}></Route>
                    <Route path = {`${match.path}/setting`}component={Settings}></Route>
                </div>
            </div>
       
        )
    }
}


export default StudentView;