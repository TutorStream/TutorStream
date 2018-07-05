import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';


class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          session_id : 123
        };
    }
      
    render() {

       return(
        <VideoChat room_id = {this.state.session_id}/>
            )
    }
}

export default Classroom;
