import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col } from 'reactstrap';
import { PageHeader, Jumbotron } from 'react-bootstrap';
import SessionCard from './SessionCard.jsx';

class Sessions extends Component {
  state = {
    sessions: [],
    isTutor: false,
    tests: []
  };

  componentDidMount() {
    var id = this.props.id;
    var info;
    let testObj = {};
    this.props.tests.forEach((test) => {
      testObj[test.id] = test.Name;
    });
    axios
      .get(`/users/info/${id}`)
      .then(({ data }) => {
        info = data[0];

        this.setState({
          name: info.Name,
          tests: testObj
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

  render() {
    return (
      <div>
        <Jumbotron className="container">
          <div className="main-info">
            <PageHeader>Upcoming Sessions</PageHeader>
            <br />
            <div className="main-info">
              <Row>
                <br />
                {this.state.sessions.map((session, i) => (
                  <Col sm="3" key={i} style={{'padding-bottom': '10px'}}>
                    <SessionCard session={session} tests={this.state.tests} deleteSession={this.deleteSession} updateSessionDisplay={this.updateSessionDisplay} />
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
