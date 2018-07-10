import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
// const socket = io('144.121.106.166:3000'); // hany's IP
// const socket = io(); // may need to just instantiate conenct like this to work when deployed?
const socket = io.connect('10.16.3.19:3000'); // to work locally, need to set to one of our local IP addresses (custom socket)

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: ['bingo']
      // sessionId : '781918272828' // hard-coded, delete this and just pass in sessionId below
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.clearInput = this.clearInput.bind(this);

    // SOCKET.IO : Client-Side Listeners --> put all here in constructor
    socket.on('sending-back', msg => {
      console.log('what does this msg look like on client side :', msg);
      this.setState({
        messages: [msg.message, ...this.state.messages]
      });
    });
  }

  clearInput() {
    this.setState({
      message: ''
    });
  }

  messageHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  postMessage(e) {
    e.preventDefault();
    socket['name'] = this.state.username;
    if (this.state.message.length > 0) {
      this.setState(
        {
          messages: [this.state.message, ...this.state.messages]
        },
        () => {
          socket.emit('new-message', {
            user: socket['name'],
            message: this.state.message,
            room: this.props.session_id
          });
          this.clearInput();
        }
      );
    }
  }

  componentDidMount() {
    console.log('chat user id', this.props);
    axios
      .get(`users/username/${this.props.id}`)
      .then(({ data }) => {
        this.setState(
          {
            username: data[0].Name
          },
          () => {
            console.log('username ', this.state.username);
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
    console.log('chat mounting?');
    socket.emit('room', { room: this.props.session_id });
  }

  componentWillUnmount() {
    socket.on('leaving-room', {
      room: this.state.sessionId
    });
  }
  //   <Chat
  //   id={this.state.id}
  //   upcomingSession={this.state.upcomingSession}
  //   session_id={this.state.session_id}
  // />

  render() {
    console.log(this.props.upcomingSession, 'upcoming session');

    return (
      <div className="chat-container">
        <h1 className="header">Chat Channel</h1>
        <div className="all-messages">
          {this.state.messages.map((msg, i) => {
            return (
              <div key={i} className="msg">
                <strong> {msg.user}: </strong> {msg.message}{' '}
              </div>
            );
          })}
        </div>
        <form
          className="add-new-message"
          onSubmit={e => {
            this.postMessage(e);
          }}
        >
          <label>New Message:</label>
          <input
            type="text"
            name="message"
            className="input-msg"
            value={this.state.message}
            onChange={this.messageHandler}
          />
          <button type="submit" value="Submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Chat;
