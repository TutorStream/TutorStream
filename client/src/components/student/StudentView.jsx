import React from 'react';
import Sidebar from '../Sidebar.jsx'

class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'Sessions', func : 'tutor'},
                {name :'Inbox', func : 'tutor'},
                {name :'Classroom', func : 'tutor'},
                {name :'Become a Tutor', func : 'tutor'}
            ]
        }
        this.sessions = this.sessions.bind(this)
        this.inbox = this.inbox.bind(this)
        this.tutor = this.tutor.bind(this)
        this.classroom = this.classroom.bind(this)
    }


    sessions(){
        console.log('Sessions')
    }

    inbox(){
        console.log('Inbox')
    }

    tutor(){
        console.log('Become Tutor')
    }

    classroom(){
        console.log('classroom')
    }

    render() {
        return (
            <div>
                <button onClick={this.props.handleSwitchView} name= 'goToHome'>Home</button>
                <button onClick={this.props.handleSwitchView} name= 'goToTutor'>Tutor Home</button>
                <h1>Student View</h1>
                <br/><br/>
                <div className='student-main'>
                    <Sidebar options = {this.state.options} handleSwitchView={this.props.handleSwitchView}/>                
                    <div className='student-view'>
                        <h2>Main Page</h2>
                    </div>

                </div>
            </div>
            
            
        )
    }
}


export default StudentView;


// <div className='student-options'>
//                         <h2>Sidebar/Menu</h2>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button onClick={this.props.handleSwitchView} className='student-option' name='becomeTutor'>Become A Tutor</button>
//                     </div>
