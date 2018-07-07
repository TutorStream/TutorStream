import React, { Component } from 'react';
// import TutorProfile from './TutorProfile.jsx';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';


class UpcomingSession extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            room_id: 100 + this.props.room_id,
            active: false,
            upcomingSession: this.props.upcomingSessions[0],
            upcomingCaller: '',
            countdown: this.props.countdown
        };

    }
      

    componentDidMount(){
        console.log('my date is.. my date is.. weet weet :',`${this.props.upcomingSessions[0].date.slice(0,10)}T${this.props.upcomingSessions[0].time}.000`)
        if(this.props.isTutor){
            this.getUserInfo(this.state.upcomingSession.student_id)
        }else{
            this.getUserInfo(this.state.upcomingSession.tutor_id)
        }
    }


    getUserInfo(id){
        var info;
        axios.get(`/users/info/${id}`)
        .then(({data}) => {
            info = data[0]
            console.log('data recieved in settings: ', info)
            this.setState({
                upcomingCaller: info.Name,
                isTutor: info.Tutor
            },()=>console.log('caller info :', this.state))
        })
    }

    render() {
        //room currently hardcoded.. will change it to session id as a chat room number
        var callerType = this.props.isTutor? 'Student' : 'Tutor';
       return(
        <div>
        
        <FormGroup controlId="formControlsTextarea">
            <ControlLabel><h2>Upcoming Session</h2></ControlLabel>
            <br/>
            <ControlLabel><h3>starts in : {this.state.countdown}</h3></ControlLabel>
            <br/>
            <br/>
            <ControlLabel><h3>{callerType}: {`${this.state.upcomingCaller}`}</h3></ControlLabel>
        </FormGroup>




       
        </div>
       
            )
    }
}

export default UpcomingSession;
