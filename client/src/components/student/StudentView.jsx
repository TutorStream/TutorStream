import React from 'react';
import Sidebar from '../Sidebar.jsx'
import Sessions from './Sessions.jsx'


class StudentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options : [
                {name :'Sessions', func : 'tutor'},
                {name :'Inbox', func : 'tutor'},
                {name :'Classroom', func : 'tutor'},
<<<<<<< HEAD
                {name :'Become a Tutor', func : 'tutor'}
            ],
            Tests : [
              {ID: 1, Name: 'DAT', Description: 'dental school test'},
              {ID: 2, Name: 'LSAT', Description: 'law school test'},
              {ID: 3, Name: 'SAT', Description: 'high school test'},
              {ID: 4, Name: 'GRE', Description: 'grad school regular test'},
              {ID: 5, Name: 'GMAT', Description: 'grad school business test'},
              {ID: 6, Name: 'Hack Reactor T A', Description: 'smartest ppl alive test'}
            ],
            
=======
                {name :'Become a Tutor', func : 'tutor'},
                {name :'Settings', func : 'settings'}
            ]
>>>>>>> 8550a75d611d560651b0eb0989986cd095098d37
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
                    <Sidebar options = {this.state.options} handleSwitchView={this.props.handleSwitchView}/>                
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


// <div className='student-options'>
//                         <h2>Sidebar/Menu</h2>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button className='student-option'>option</button>
//                         <button onClick={this.props.handleSwitchView} className='student-option' name='becomeTutor'>Become A Tutor</button>
//                     </div>
