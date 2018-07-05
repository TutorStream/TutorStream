import React, { Component } from "react";
import io from 'socket.io-client'; 

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : io(),
      message : '',
      messages : ['bingo', 'bango'],
    };
    this.messageHandler = this.messageHandler.bind(this);
    this.postMessage = this.postMessage.bind(this);
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
      messages : this.state.message
    }, () => {
      this.state.socket.emit('new-message', {
        message : this.state.message
      });
    })
  }

  componentDidMount() {
    // will eventually need to get all messages form th DB
    this.state.socket.on('connect', () => {
      console.log('making it into the chat');
    })
  }

  render() {
    return (
      <div className="chat">
        <h1>Chat Channel</h1>
        {/* <div className="all-messages">
            {this.state.messages.map((msg, i) => {
              return (
                <div key={i} className="msg">
                  {msg}
                </div>
              )
            })}
        </div> */}
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
