import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';

import TutorProfile from './TutorProfile.jsx';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TestList from './TestList.jsx';

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id : this.props.userId,
      test_id: 1,
      tutor_id: null,
      tutors: []
    };
    this.getTutors = this.getTutors.bind(this);
    this.setTestID = this.setTestID.bind(this);
    this.grabTutorId = this.grabTutorId.bind(this);
    this.getSelectTutors = this.getSelectTutors.bind(this);
  }

  getTutors() {
    axios
      .get('/tutors')
      .then(({ data }) => {
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getSelectTutors() {
    axios
      .get('/tutors/selectTutors', {
        params: {
          test_id: this.state.test_id
        }
      })
      .then(({ data }) => {
        this.setState({
          tutors: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  setTestID(id) {
    this.setState(
      {
        test_id: id
      },
      () => {
        this.getSelectTutors();
      }
    );
  }

  grabTutorId(id) {
    this.setState({
      tutor_id: id
    });
  }

  componentDidMount() {
    this.getTutors();
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <TestList setTestID={this.setTestID} />
          </div>
          <div className="tutors-container">
            <div className="all-tutors">
              {this.state.tutors.map((tutor, i) => {
                return (
                  <div className="indv-tutor" key={i}>
                    <Link to={`/tutors/${tutor.id}`}>
                      <span className="tutor-name">{tutor.Name}</span>
                    </Link>
                    <br />
                    <div>Bio: {tutor.Bio}</div>
                    <br />
                    <br />
                    <div>Rating: {tutor.Rating}</div>
                    <br />
                    <br />
                    <div>Price: ${tutor.Price} / hr</div>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default StudentView;
