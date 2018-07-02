import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class Sessions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: []
    }
    this.getUpcomingSessions = this.getUpcomingSessions.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
    this.updateSessionDisplay = this.updateSessionDisplay.bind(this);
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
    .catch((err) => {
      console.error(err);
    })
  }

  updateSessionDisplay () {
    // could put jquery in here to update schema with red coloring?
    return (
      <div>
        PAST SESSION
      </div>
    )
  }

  componentDidMount(){
    this.getUpcomingSessions()
  }

  render() {
    let currentDate = moment();

    return (
        <div>
            <h1 className="sessions-header">Sessions</h1> 
            <ul className="all-sessions">
            {this.state.sessions.map((session, i) => {
              return (
                <div className="indv-session" key={i} onClick={() => {this.deleteSession(session.id)}}>
                  {moment(session.date).isAfter(currentDate) ? this.updateSessionDisplay() : null}
                  <span className="session-name"><strong><u>Tutor</u>:</strong>  {session.Name}</span>
                  <br>
                  </br>
                  <span><strong><u>Date</u>:</strong> {session.date.slice(0,10)}</span>
                  <br>
                  </br>
                  <span><strong><u>Start Time</u>:</strong> {Number(session.time.slice(0,2)) < 12 ? session.time.slice(0,5) + ' a.m.' : String(24 - Number(session.time.slice(0,2))) + session.time.slice(2,5) + ' p.m.' }</span>
                </div>
              )
            }).reverse()}
            </ul>
        </div>
    )
  }
}

export default Sessions 