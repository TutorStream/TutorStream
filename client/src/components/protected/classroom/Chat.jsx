import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: ['bingo']
    };
    // SOCKET.IO : Client-Side Listeners --> put all here in constructor
    socket.on('new-message', msg => {
      this.setState({
        messages: [msg, ...this.state.messages]
      });
    });
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

  clearInput = () => {
    this.setState({
      message: ''
    });
  };

  messageHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postMessage = e => {
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
  };

  render() {
    console.log(this.props.upcomingSession, 'upcoming session');
    return (
      <div className="chat-container">
        <h1 className="header">Chat Channel</h1>
        <div className="all-messages">
          {this.state.messages.map((msg, i) => {
            return (
              <div key={i} className="msg">
                <strong> {this.state.username}: </strong> {msg}
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
