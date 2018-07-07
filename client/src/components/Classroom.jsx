import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';
import WriteReview from './WriteReview.jsx';
import axios from 'axios';
import Chat from './Chat.jsx';
import UpcomingSession from './UpcomingSession.jsx';
import moment from 'moment';


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
          tooEarly: true
        };
        this.getUpcomingSessionInfo = this.getUpcomingSessionInfo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    componentDidMount(){
        var id = this.props.id
        var info;
       console.log('props',this.props)
       console.log('id?',id)
       this.getUserInfo(id)        
        }


        getUserInfo(id){
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

    handleSubmit(){
        this.setState({
            review : true
        })
    }
      //if isTutor is true get tutor session, else get user session
    getUpcomingSessionInfo(id){
        console.log('What is state ?? ',this.state)
        axios.get(`/sessions/${id}`, {
            params: {
                isTutor: this.state.isTutor
            }
            })
                .then(({data}) => {
                var info = data
                this.setState({
                    upcomingSessions: info,
                    upcomingSession: info[0],
                    countdown: moment(`${info[0].date.slice(0,10)}T${info[0].time}.000`).fromNow(true)
                },()=>{
                    
                    this.setState({
                        ready: true
                    },()=>{
                        console.log('state is', this.state)
                        if(Number(this.state.countdown.slice(0,2)) < 20 && this.state.countdown.slice(-5)!== 'hours')
                        console.log('state is', this.state)
                        this.setState({
                            tooEarly: false
                        })

                    })
                    console.log('Countdown',this.state.countdown)

                })
                })

        
    }

    render() {
        let conditionalDisplayC = !this.state.tooEarly?<UpcomingSession upcomingSessions = {this.state.upcomingSessions} isTutor={this.state.isTutor} getUserInfo={this.getUserInfo} countdown={this.state.countdown}/> :
        <div>
        <UpcomingSession upcomingSessions = {this.state.upcomingSessions} isTutor={this.state.isTutor} getUserInfo={this.getUserInfo} countdown={this.state.countdown}/> 
        <VideoChat room_id = {this.state.session_id} handleSubmit={this.handleSubmit}/>
        <Chat id={this.state.id} upcomingSession={this.state.upcomingSession}/>
        </div>

        let conditionalDisplayb = this.state.ready? 
        <div>
            {conditionalDisplayC}
            </div>
        : <div>empty</div>

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
