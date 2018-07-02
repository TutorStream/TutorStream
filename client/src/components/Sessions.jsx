import React, {Component} from 'react';
import axios from 'axios';

class Sessions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: []
    }
    this.getUpcomingSessions = this.getUpcomingSessions.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
  }

  getUpcomingSessions() {
   const id = this.props.id
    axios.get(`/sessions/${id}`)
    .then(({data}) => {
      this.setState({
          sessions: data
      });
    })
  }

  deleteSession(id){
    axios.delete(`/sessions/${id}`)
    .then(() => {
        this.getUpcomingSessions()
    })
  }

  componentDidMount(){
    this.getUpcomingSessions()
  }

  render() {
    // import Link from react-router-dom and wrap around info.date or whatever we decide to put in there
    // also wrap whatever we put in there with a button that also has access to the id of the session 
    // put onClick => this.deleteSession
    return (
        <div>
            <h1 className="sessions-header">Sessions</h1> 
            <ul className="all-sessions">
            {this.state.sessions.map((session, i) => {
              return (
                <div className="indv-session" key={i}>
                  <span className="session-name"><strong><u>Tutor</u>:</strong>  {session.Name}</span>
                  <br>
                  </br>
                  <span><strong><u>Date</u>:</strong> {session.date.slice(0,10)}</span>
                  <br>
                  </br>
                  <span><strong><u>Start Time</u>:</strong> {Number(session.time.slice(0,2)) < 12 ? session.time.slice(0,5) + ' a.m.' : String(24 - Number(session.time.slice(0,2))) + session.time.slice(2,5) + ' p.m.' }</span>
                </div>
              )
            })}
            </ul>
        </div>
    )
  }
}

export default Sessions 