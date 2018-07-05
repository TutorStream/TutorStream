import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import TutorProfile from './TutorProfile.jsx';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client';


import {
    SAMPLE_SERVER_BASE_URL,
    API_KEY,
    SESSION_ID,
    TOKEN
  } from '../../../config.js';

class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          error: null,
          connection: 'Connecting',
          publishVideo: true,
          apiKey: API_KEY,
          sessionId: SESSION_ID,
          token: TOKEN,
          isOnline : false
        };
    
        this.sessionEventHandlers = {
          sessionConnected: () => {
            this.setState({ connection: 'Connected' });
          },
          sessionDisconnected: () => {
            this.setState({ connection: 'Disconnected' });
          },
          sessionReconnected: () => {
            this.setState({ connection: 'Reconnected' });
          },
          sessionReconnecting: () => {
            this.setState({ connection: 'Reconnecting' });
          },
        };
    
        this.publisherEventHandlers = {
          accessDenied: () => {
            console.log('User denied access to media source');
          },
          streamCreated: () => {
            console.log('Publisher stream created');
          },
          streamDestroyed: ({ reason }) => {
            console.log(`Publisher stream destroyed because: ${reason}`);
          },
        };
    
        this.subscriberEventHandlers = {
          videoEnabled: () => {
            console.log('Subscriber video enabled');
          },
          videoDisabled: () => {
            console.log('Subscriber video disabled');
          },
        };
        this.startConnection = this.startConnection.bind(this)
        this.toggleVideo = this.toggleVideo.bind(this)
      }

      startConnection(){
          this.setState({
              isOnline: true
          })
      }
    
      toggleVideo(){
        this.setState({ publishVideo: !this.state.publishVideo });
      };
      
    render() {

      return(
        <iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=8544449c-6e81-4eed-a738-3ae823ba780e&room=123&iframe=true" width="800px" height="640px" allow="microphone; camera" ></iframe>
            )
   }
}

export default Classroom;
