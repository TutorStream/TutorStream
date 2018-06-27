import React from 'react';
import Sidebar from '../Sidebar.jsx';


class TutorHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'Sessions', func : 'tutor'},
                {name :'Inbox', func : 'tutor'},
                {name :'Classroom', func : 'tutor'},
                {name :'Dashboard', func : 'tutorHome'}
            ]
        }
    }



    render() {
        return (
            <div>
                <button onClick={this.props.handleSwitchView} name= 'goToHome'>Home</button>
                <button onClick={this.props.handleSwitchView} name= 'goToStudent'>Student</button>
                <h1>Tutor Home</h1>
                <Sidebar  options = {this.state.options} handleSwitchView={this.props.handleSwitchView}/>
            </div>
            
        )
    }
}


export default TutorHome;