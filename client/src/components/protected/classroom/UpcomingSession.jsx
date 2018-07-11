import React, { Component } from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import axios from 'axios';

class UpcomingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room_id: 100 + this.props.room_id,
      active: false,
      upcomingSession: this.props.upcomingSession,
      upcomingCaller: '',
      countdown: this.props.countdown
    };
  }

  componentDidMount() {
    if (this.props.isTutor) {
      this.getUserInfo(this.props.upcomingSession.student_id);
    } else {
      this.getUserInfo(this.props.upcomingSession.tutor_id);
    }
  }

  getUserInfo = id => {
    var info;
    axios.get(`/users/info/${id}`).then(({ data }) => {
      info = data[0];
      this.setState({
        upcomingCaller: info.Name,
        isTutor: info.Tutor
      });
    });
  };

  render() {
    var callerType = this.props.isTutor ? 'Student' : 'Tutor';
    var timer =
      Number(this.props.countdown.slice(0, 2)) <= 2 &&
      (this.props.countdown.slice(-7) === 'minutes' ||
        this.props.countdown.slice(-6) === 'minute' ||
        this.props.countdown.slice(-7) === 'seconds')
        ? 'Now'
        : this.props.countdown;
    return (
      <div>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>
            <h2>Upcoming Session</h2>
          </ControlLabel>
          <hr />
          <br />

          <ControlLabel>
            <h4>starts in : {timer}</h4>
          </ControlLabel>
          <br />
          <ControlLabel>
            <p>
              Details:
              <br />
              <h4>Date:</h4>
              {this.props.upcomingSession.date.slice(0, 10)}
              <br />
              time: {this.props.upcomingSession.time}
              <br />
              with: {this.props.upcomingCaller}
              <br />
            </p>
          </ControlLabel>
          <br />
          <br />
          <ControlLabel>
            <h3>
              {callerType}: {`${this.state.upcomingCaller}`}
            </h3>
          </ControlLabel>
        </FormGroup>
      </div>
    );
  }
}

export default UpcomingSession;
