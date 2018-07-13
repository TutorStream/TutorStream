import React, { Component } from 'react';
import {
  Popover,
  FormGroup,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap';
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: []
    };
    // SOCKET.IO : Client-Side Listeners --> put all here in constructor
    socket.on('new-message', msg => {
      this.setState({
        messages: [msg, ...this.state.messages]
      });
    });
  }

  componentDidMount() {
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
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postMessage = e => {
    e.preventDefault();
    socket['name'] = this.state.username;
    console.log(this.state.messages);
    if (this.state.message.length > 0) {
      this.setState(
        {
          messages: [
            { user: this.state.username, message: this.state.message },
            ...this.state.messages
          ]
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
    let top = 50;
    return (
      <div className="chat-container">
        <h1 className="header">Chat Channel</h1>
        <div className="all-messages" style={{ height: 250 }}>
          {this.state.messages.length
            ? this.state.messages.map((msg, i) => {
                return (
                  <div>
                    <span>{msg.user}</span>: <span>{msg.message}</span>
                  </div>
                );
              })
            : null}
        </div>
        <form
          className="add-new-message"
          onSubmit={e => {
            this.postMessage(e);
          }}
        >
          <InputGroup>
            <InputGroup.Button>
              <Button type="submit" value="Submit">
                Send
              </Button>
            </InputGroup.Button>
            <FormControl
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.messageHandler}
            />
          </InputGroup>
        </form>
      </div>
    );
  }
}

export default Chat;
