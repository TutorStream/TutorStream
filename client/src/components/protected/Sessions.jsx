import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import { PageHeader, Jumbotron } from 'react-bootstrap';

class Sessions extends Component {
  state = {
    sessions: [],
    isTutor: false
  };

  componentDidMount() {
    var id = this.props.id;
    var info;
    axios
      .get(`/users/info/${id}`)
      .then(({ data }) => {
        info = data[0];
        this.setState({
          name: info.Name
        });
      })
      .then(() => {
        if (info.Tutor === 1) {
          this.setState(
            {
              isTutor: true
            },
            () => {
              this.getUpcomingSessions(id);
            }
          );
        } else {
          this.getUpcomingSessions(id);
        }
      });
  }

  getUpcomingSessions = id => {
    axios
      .get(`/sessions/${id}`, {
        params: {
          isTutor: this.state.isTutor
        }
      })
      .then(({ data }) => {
        this.setState({
          sessions: data
        });
      });
  };

  deleteSession = id => {
    axios
      .delete(`/sessions/${id}`)
      .then(() => {
        this.getUpcomingSessions(this.props.id);
      })
      .catch(err => {
        console.error(err);
      });
  };

  updateSessionDisplay = () => {
    return <div className="past-session">PAST SESSION</div>;
  };

  render() {
    return (
      <div>
        <Jumbotron className="container">
          <div className="main-info">
            <PageHeader> Booked Sessions</PageHeader>
            <p className="tag-line">currently booked sessions</p>
            <br />
            <hr />
            <br />
            <div className="main-info">
              <Row>
                <br />
                {this.state.sessions.map((session, i) => (
                  <Col sm="3" key={i}>
                    <div className="indv-session" key={i}>
                      {moment(session.date).isBefore()
                        ? this.updateSessionDisplay()
                        : null}
                      <span className="session-name">
                        <strong>
                          {this.state.isTutor ? <u>Student</u> : <u>Tutor</u>}
                        </strong>{' '}
                        {session.Name}
                      </span>
                      <br />
                      <span>
                        <strong>
                          <u>Date</u>:
                        </strong>{' '}
                        {session.date.slice(0, 10)}
                      </span>
                      <br />
                      <span>
                        <strong>
                          <u>Start Time</u>:
                        </strong>{' '}
                        {Number(session.time.slice(0, 2)) < 12
                          ? session.time.slice(0, 5) + ' a.m.'
                          : String(24 - Number(session.time.slice(0, 2))) +
                            session.time.slice(2, 5) +
                            ' p.m.'}
                      </span>
                      <br />
                      <button
                        className="delete-btn"
                        size="sm"
                        onClick={() => {
                          this.deleteSession(session.id);
                        }}
                      >
                        Delete Session
                      </button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Sessions;
