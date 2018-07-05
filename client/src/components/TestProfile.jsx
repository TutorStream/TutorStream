import React, { Component } from 'react';
import axios from 'axios';
import TutorCard from './TutorCard.jsx';
import { Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PageHeader, Jumbotron } from 'react-bootstrap';

class TestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      tutors: []
    };
  }

  getTestInfo(test_id) {
    axios
      .get(`/tests/${test_id}`)
      .then(({ data }) => {
        data = data[0];
        this.setState({
          name: data.Name,
          description: data.Description
        });
      })
      .catch(err => {
        console.error('There was an error getting your test info: ', err);
      });
  }

  getTutors(test_id) {
    axios
      .get(`/tutors/selectTutors`, {
        params: {
          test_id: test_id
        }
      })
      .then(({ data }) => {
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error(
          'There was an error getting the tutors for this test: ',
          err
        );
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getTestInfo(id);
    this.getTutors(id);
  }

  render() {
    return (
      <div>
        <Jumbotron className="container">
          <div className="main-info">
            <span>
              <h1>{this.state.name}</h1>
            </span>
            <br />
            <p>{this.state.description}</p>
          </div>
          <hr />
          <div className="main-info">
            <Row>
              {this.state.tutors.map(tutor => (
                <Col sm="3" key={tutor.ID}>
                  <Link to={`/tutors/${tutor.ID}`}>
                    <TutorCard
                      key={tutor.ID}
                      name={tutor.Name}
                      rating={tutor.Rating}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default TestProfile;
