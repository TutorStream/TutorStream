import React from 'react';
import Sessions from './Sessions.jsx'


class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <button onClick={this.props.handleSwitchView} name= 'goToHome'>Home</button>
                <button onClick={this.props.handleSwitchView} name= 'goToTutor'>Tutor Home</button>
                <h1>Student View</h1>
                <br/><br/>
                <div className='student-main'>

                    <div className='student-options'>
                        <h2>Sidebar/Menu</h2>
                        <button className='student-option'>option</button>
                        <button className='student-option'>option</button>
                        <button className='student-option'>option</button>
                        <button className='student-option'>option</button>
                        <button onClick={this.props.handleSwitchView} className='student-option' name='becomeTutor'>Become A Tutor</button>
                    </div>

                    <div className='student-view'>
                        <h2>Main Page</h2>
                    </div>

                </div>
                <hr/>
                <Sessions />
            </div>
            
            
        )
    }
}


export default StudentView;