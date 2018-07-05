import React, { Component } from 'react';
// import TutorProfile from './TutorProfile.jsx';


class VideoChat extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
         
        };
    }
      
    render() {
        //room currently hardcoded.. will change it to session id as a chat room number
       return(
        <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=8544449c-6e81-4eed-a738-3ae823ba780e&room=${this.props.room_id}&iframe=true`} width="800px" height="640px" allow="microphone; camera" ></iframe>
            )
    }
}

export default VideoChat;
