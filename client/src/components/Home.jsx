import React, { Component } from 'react';
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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TutorCard from './TutorCard.jsx';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user_id: this.props.id || null,
      tutors: [],
      tests: []
    };
    this.getTutors = this.getTutors.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getTutors() {
    axios
      .get('/tutors')
      .then(({ data }) => {
        data = data.slice(0, 10);
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error('There was an error getting all the tutors: ', err);
      });
  }

  getAllTests() {
    axios
      .get('/tests')
      .then(({ data }) => {
        this.setState({
          tests: data
        });
      })
      .catch(err => {
        console.error('There was an error getting all the tests: ', err);
      });
  }

  componentDidMount() {
    this.getTutors();
    this.getAllTests();
  }

  render() {
    return (
      <div>
        <div className="main-info">
          <Jumbotron className="container">
            <PageHeader> TutorStream </PageHeader>
            <p className="tag">You have questions, we have tutors.</p>
            <br />
            <br />
            <div>
              Featured Tutors:
              <Row>
                <br />
                {this.state.tutors.map(tutor => (
                  <Col sm="3" key={tutor.ID}>
                    <Link to={`/tutors/${tutor.ID}`}>
                      <TutorCard
                        key={tutor.ID}
                        name={tutor.Name}
                        rating={tutor.Rating}
                      />
                    </Link>
                    <br />
                  </Col>
                ))}
              </Row>
            </div>
            <br />
            <br />
            <div>
              Tests Available for Tutoring:
              {this.state.tests.map(test => (
                <a key={test.ID} href="#">
                  <h3>{test.Name}</h3>
                </a>
              ))}
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default Home;
