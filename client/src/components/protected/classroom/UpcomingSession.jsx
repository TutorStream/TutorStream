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
            upcomingSession: this.props.upcomingSession,
            upcomingCaller: '',
            countdown: this.props.countdown
        };
    }
      

    componentDidMount(){
        if(this.props.isTutor){
            this.getUserInfo(this.props.upcomingSession.student_id)
        }else{
            this.getUserInfo(this.props.upcomingSession.tutor_id)
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
        var timer = ((Number(this.props.countdown.slice(0,2)) <=2) && ((this.props.countdown.slice(-7)=== 'minutes')||(this.props.countdown.slice(-6)=== 'minute')||(this.props.countdown.slice(-7)=== 'seconds')))? 'Now' : this.props.countdown;
        console.log('time right now!!!! countdown from state :', this.state.countdown,'time right now!!!! countdown from props :',this.props.countdown)
       return(
        <div>
        
        <FormGroup controlId="formControlsTextarea">
            <ControlLabel><h2>Upcoming Session</h2></ControlLabel>
            <hr/>
            <br/>
            
            <ControlLabel><h4>starts in : {timer}</h4></ControlLabel>
            <br />
            <ControlLabel>
            <p>Details:
                <br/>
                <h4>Date:</h4 >{this.props.upcomingSession.date.slice(0,10)}
                <br/>
                time:  {this.props.upcomingSession.time}
                <br/>
                with:  {this.state.upcomingCaller}
                <br/>
            </p></ControlLabel>

            {/* <ControlLabel><h2>Next:</h2></ControlLabel>
            <br/>
            
            <ControlLabel><h4>starts in : {timer}</h4></ControlLabel>
            <br />
            <ControlLabel>
            <p>Details:
                <br/> //this.props.upcoming.. will get the freshest upcoming if we need that // this.state.upcomingSess will get you the upcoming one on component did mount (not live update)
                <h4>Date:</h4 >{this.props.upcomingSession.date.slice(0,10)}
                <br/>
       time:  {this.props.upcomingSession.time} 
                <br/>
                with:  {this.props.upcomingCaller}
                <br/>
            </p></ControlLabel> */}

            <br/>
            <br/>
            <ControlLabel><h3>{callerType}: {`${this.state.upcomingCaller}`}</h3></ControlLabel>
        </FormGroup>




       
        </div>
       
            )
    }
}

export default UpcomingSession;
