import React, { Component } from "react";
import io from 'socket.io-client'; 
const socket = io();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : '',
      messages : ['bingo', 'bango'],
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.postMessage = this.postMessage.bind(this);

    // SOCKET.IO : Client-Side Listeners
    // may need to put all socket.on() functionality in this space before return
    socket.on('sending-back', (msg) => {
      // document.getElementsByClassName('all-messages').append(<div>msg</div>);
      console.log('what does this msg look like on client side :', msg);
      this.setState({
        messages : [msg.message, ...this.state.messages]
      })
    })
  }

  messageHandler (e) {
    console.log('e.target.value', e.target.value);
    this.setState({
      [e.target.name] : e.target.value
    }, () => {
      console.log(this.state.message);
    });
  }

  postMessage(e) {
    e.preventDefault();
    console.log(this.state.message);
    this.setState({
      messages : [this.state.message, ...this.state.messages]
    }, () => {
      socket.emit('new-message', {
        message : this.state.message
      });
    })
  }

  componentDidMount() {
    // will eventually need to get all messages form th DB
    socket.on('connect', () => {
      console.log('making it into the chat');
    })
  }

  render() {
    console.log(this.state.messages);
    return (
      <div className="chat">
        <h1>Chat Channel</h1>
        <div className="all-messages">
            {this.state.messages.map((msg, i) => {
              return (
                <div key={i} className="msg">
                  {msg}
                </div>
              )
            })}
        </div>
        {/* <ul className="messages"></ul> */}
        <form onSubmit={(e) => {this.postMessage(e)}}>
          <label>New Message:</label>
          <input type="text" name="message" className="msg" value={this.state.message} onChange={this.messageHandler}/>
          <button type="submit" value="Submit">Send</button>
        </form>
      </div>
    )
  }
}

export default Chat;
