import React, { Component } from 'react';
// import TutorProfile from './TutorProfile.jsx';
import {Button} from 'react-bootstrap';


class VideoChat extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            
        };

    }
      



    render() {
        //room currently hardcoded.. will change it to session id as a chat room number
        
       return(
        <div>
        <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=8544449c-6e81-4eed-a738-3ae823ba780e&room=${this.props.room_id}&iframe=true`} width="800px" height="640px" allowFullScreen="true"  allow="microphone; camera" >
        </iframe>
        <br />
        <Button bsStyle="success" type="submit" onClick={this.props.handleSubmit}>End and Review</Button>

        </div>
       
            )
    }
}

export default VideoChat;
