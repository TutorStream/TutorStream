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

        // const { apiKey, sessionId, token } = this.props.credentials;
        const { connection, publishVideo, isOnline } = this.state;

        if (API_KEY && TOKEN && SESSION_ID && isOnline) {
            return (
                <div>
                 

                  <OTSession
                    apiKey={this.state.apiKey}
                    sessionId={this.state.sessionId}
                    token={this.state.token}
                    onError={this.onSessionError}
                    eventHandlers={this.sessionEventHandlers}
                  >
                    <button id="videoButton" onClick={this.toggleVideo}>
                      {publishVideo ? 'Disable' : 'Enable'} Video
                    </button>
                    <p>Publisher Here!</p>
                    <OTPublisher
                      properties={{ publishVideo, width: 250, height: 250, }}
                      onPublish={this.onPublish}
                      onError={this.onPublishError}
                      eventHandlers={this.publisherEventHandlers}
                    />
                    <p>Subscriber Here!</p>
                    <OTStreams>
                      <OTSubscriber
                        properties={{ width: 200, height: 200 }}
                        onSubscribe={this.onSubscribe}
                        onError={this.onSubscribeError}
                        eventHandlers={this.subscriberEventHandlers}
                      />
                    </OTStreams>
                  </OTSession>
                </div>
              );
          } else {
            
            return (
                <div>
                <h1>Classroom</h1>
               
                <button onClick={this.startConnection}>Connect</button>
                
                </div>
            )
    }}
}

export default Classroom
