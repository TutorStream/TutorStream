import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

import TestList from './../../un-protected/TestList.jsx';

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test_id: 1,
      tutor_id: null,
      tutors: []
    };
  }

  getTutors = () => {
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
  };

  getSelectTutors = () => {
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
  };

  setTestid = id => {
    this.setState(
      {
        test_id: id
      },
      () => {
        this.getSelectTutors();
      }
    );
  };

  grabTutorId = id => {
    this.setState({
      tutor_id: id
    });
  };

  componentDidMount = () => {
    this.getTutors();
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <TestList setTestid={this.setTestid} />
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
