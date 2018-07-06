import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from 'reactstrap';
import { PageHeader, Jumbotron } from 'react-bootstrap';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: []
    };
    this.getUpcomingSessions = this.getUpcomingSessions.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
    this.updateSessionDisplay = this.updateSessionDisplay.bind(this);
  }

  getUpcomingSessions() {
    const id = this.props.id;
    axios.get(`/sessions/${id}`).then(({ data }) => {
      this.setState({
        sessions: data
      });
    });
  }

  deleteSession(id) {
    axios
      .delete(`/sessions/${id}`)
      .then(() => {
        this.getUpcomingSessions();
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateSessionDisplay() {
    // could put jquery in here to update schema with red coloring?
    return <div className="past-session">PAST SESSION</div>;
  }

  componentDidMount() {
    this.getUpcomingSessions();
  }

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
                          <u>Tutor</u>:
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
