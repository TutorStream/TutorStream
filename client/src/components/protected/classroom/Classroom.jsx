import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';
import WriteReview from './WriteReview.jsx';
import axios from 'axios';
import Chat from './Chat.jsx';
import UpcomingSession from './UpcomingSession.jsx';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';


class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          session_id : 123,
          review : false,
          isTutor: null,
          name: '',
          id: this.props.id,
          upcomingSessions: [],
          upcomingSession: {},
          ready : false,
          countdown: '',
          tooEarly: true,
          interval: 1000,
          loading: true,
          active: false
        };
    }

    componentDidMount () {
        var id = this.props.id
        var info;
        this.interval = setInterval(() => this.getUserInfo(id), 4000);
   }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getUserInfo = (id) => {
        var info;
        axios.get(`/users/info/${id}`)
        .then(({data}) => {
            info = data[0]
            console.log('data recieved in settings: ', info)
            this.setState({
                name: info.Name,
                isTutor: info.Tutor
            },()=>this.getUpcomingSessionInfo(id))
        })
        .then(()=>{})
    }

    handleSubmit = () => {
        this.setState({
            review : true,
            interval: 60000
        },()=>{
           this.markSessionComplete()
        })
    }


    markSessionComplete = () => {
        console.log('updating to complete and state is : ', this.state)
        axios.put(`/sessions/${this.state.session_id}`)
             .then(()=>console.log('Marked Complete'))
    }
      //if isTutor is true get tutor session, else get user session
    getUpcomingSessionInfo = (id) => {
        console.log('What is state ?? ',this.state)
        axios.get(`/sessions/${id}`, {
            params: {
                isTutor: this.state.isTutor
            }
            })
                .then(({data}) => {
                var info = data
                console.log('info>>>>>: ',info)
                if(info.length > 0){
                    this.setState({
                    upcomingSessions: info,
                    upcomingSession: info[0],
                    session_id: info[0].id,
                    countdown: moment(`${info[0].date.slice(0,10)}T${info[0].time}.000`).fromNow(true)
                },()=>{
                    this.isHistory(this.state.upcomingSessions)
                    console.log('upcoming sessions order!!!!! : ', this.state.upcomingSessions)
                    if(this.state.upcomingSession){
                        this.setState({
                        ready: true
                    },()=>{
                        var timer = this.state.countdown
                        console.log("TOO EARLY??", this.state.countdown,'Current time is : ',moment() )
                        console.log("state's countdown", Number(this.state.countdown.slice(0,2)))
                        if((Number(this.state.countdown.slice(0,2)) <=2) && ((timer.slice(-7)=== 'minutes')||(timer.slice(-7)=== 'seconds'))||(timer.slice(-6)=== 'minute')){
                            console.log("YO!!", Number(this.state.countdown.slice(0,2)), " and is less than " ,1, "Bool:", Number(this.state.countdown.slice(0,2)) < 1)
                            this.setState({
                                tooEarly: false
                            },()=>console.log('state after updating is it early or not? ', this.state))
                        }
                    })}
                })}else {
                    
                    this.setState({
                        loading: false
                    })
                }
            })
    }


    isHistory = (sessions) => {
        console.log('in isHistory', sessions)
        var currentSession = null
        for(var i = 0; i < sessions.length; i++){
            var session = sessions[i]
            var currentMoment = moment()
            var sessionMoment = moment(`${session.date.slice(0,10)}T${session.time}.000`)
            var passed = currentMoment.diff(sessionMoment,'minutes')
            
            if(passed > 1){
                this.markSessionComplete()
            }else {
                currentSession = session;
                break;
            }
        }

        if(currentSession){
            console.log('currentSession is :',currentSession)
            this.setState({
                upcomingSession : currentSession,
                session_id : currentSession.id
            })
        
        }
       
    }

    render () {

        var flexStyle = {
            display: 'flex',
            justifyContent: 'space evenly'
        }


        let conditionalLoading = this.state.loading? <div>
                                                    <p>Loading Sessions</p>
                                                    <ClipLoader
                                                    color={'#FFF'} 
                                                    loading={this.state.loading} 
                                                    /></div> : <div><p>No Upcoming Sessions at this time!</p></div>

        let conditionalDisplayC = this.state.tooEarly?<UpcomingSession  upcomingSession = {this.state.upcomingSession} isTutor={this.state.isTutor} getUserInfo={this.getUserInfo} countdown={this.state.countdown}/> :
        <div>
        <UpcomingSession  upcomingSession = {this.state.upcomingSession} isTutor={this.state.isTutor} getUserInfo={this.getUserInfo} countdown={this.state.countdown}/> 
        <div className='classroom-name'style={flexStyle}>
        <VideoChat room_id = {this.state.session_id} handleSubmit={this.handleSubmit}/>
        <Chat id={this.state.id} upcomingSession={this.state.upcomingSession} session_id={this.state.session_id}/>
        </div>
        </div>
        
        let conditionalDisplayb = this.state.ready? 
        <div>
            {conditionalDisplayC}
            </div>
        : <div>
           {conditionalLoading}
            </div>

        let conditionalDisplay = this.state.review ? <WriteReview isTutor={this.state.isTutor} tutor_id ={this.state.upcomingSession.tutor_id} activeSession={this.state.upcomingSession}/> :        
         (<div>
             {conditionalDisplayb}
            </div>);





       return(
           <div>
        {conditionalDisplay}
        
        </div>
            )
    }
}

export default Classroom;
