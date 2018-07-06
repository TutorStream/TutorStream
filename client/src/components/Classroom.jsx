import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';
import Chat from './Chat.jsx';


class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          session_id : 123
        };
    }
      
    render() {

       return(
        <div>
          <VideoChat room_id = {this.state.session_id}/>
          <Chat />
        </div>
            )
    }
}

export default Classroom;
