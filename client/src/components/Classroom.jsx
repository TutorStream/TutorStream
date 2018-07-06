import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';
import WriteReview from './WriteReview.jsx';
import axios from 'axios';
import Chat from './Chat.jsx';


class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          session_id : 123,
          review : false,
          isTutor: false,
          name: '',
          id: this.props.id,
          sessions: ''
        };
        this.getUpcomingSessionInfo = this.getUpcomingSessionInfo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        var id = this.props.id
       console.log('props',this.props)
       console.log('id?',id)
        // axios.get(`/users/info/${id}`)
        //     .then(({data}) => {
        //         info = data[0]
        //         console.log('data recieved in settings: ', info)
        //         this.setState({
        //             name: info.Name,
        //         })
        //     })
        //     .then(()=>{
        //         console.log('state now is => ', this.state)
        //         console.log('info???', info)
        //         if(info.Tutor === 1){
        //             this.setState({
        //                 isTutor: true
        //             },()=> this.getUpcomingSessionInfo(id))      
        //         }
        //     })
        }

    handleSubmit(){
        this.setState({
            review : true
        })
    }
      //if isTutor is true get tutor session, else get user session
    getUpcomingSessionInfo(id){
        console.log('About to grab upcoming session info for user id: ',id)
        if(this.state.isTutor){
            axios.get(`/session/${id}`)
                 .then(({data}) => {
                    info = data[0]
                    console.log('data recieved in settings: ', info)
                    this.setState({
                        
                    })
                 })
        }else{
            //get a student user session info
            
        }
        
    }

    render() {
      
        let conditionalDisplay = this.state.review ? <WriteReview tutor_id ={this.props.id}/> :        
         (<div>
            <VideoChat room_id = {this.state.session_id} handleSubmit={this.handleSubmit}/>
            <Chat /></div>);

       return(
           <div>
        {conditionalDisplay}
        
        </div>
            )
    }
}

export default Classroom;
