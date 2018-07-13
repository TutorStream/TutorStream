import React, { Component } from 'react';
import axios from 'axios';
import TutorCard from './TutorCard.jsx';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';

class TestProfile extends Component {
  state = {
    name: '',
    description: '',
    tutors: [],
    photos: {}
  };

  getTestInfo = test_id => {
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
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getTestInfo(id);
    this.getTutors(id);
  }

  // getTutors = test_id => {
  //   axios
  //     .get(`/tutors/selectTutors`, {
  //       params: {
  //         test_id: test_id
  //       }
  //     })
  //     .then(({ data }) => {
  //       this.setState({
  //         tutors: data
  //       });
  //     })
  //     .catch(err => {
  //       console.error(
  //         'There was an error getting the tutors for this test: ',
  //         err
  //       );
  //     });
  // };

  getTutors = (test_id) => {
    axios
      .get('/tutors/selectTutors', {
        params: {
          test_id: test_id
        }
      })
      .then(({ data }) => {
        data = data.slice(0, 12);
        let idList = '';
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            idList += data[i].id;
          } else {
            idList += data[i].id + ', ';
          }
        }
        this.setState({
          tutors: data
        });
        return axios.get('/tutors/photo', {
          params: {
            idList
          }
        });
      })
      .then(({ data }) => {
        let photoObj = {};
        for (let i = 0; i < data.length; i++) {
          photoObj[data[i].user_id] = data[i].location;
        }
        this.setState({
          photos: photoObj
        });
      })
      .catch(err => {
        console.error('There was an error getting the tutors for this test: ', err);
      });
  };

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
                <Col sm="3" key={tutor.id}>
                  <Link to={`/tutors/${tutor.id}`}>
                    <TutorCard
                      key={tutor.id}
                      name={tutor.Name}
                      rating={tutor.Rating}
                      photo={this.state.photos[tutor.id]}
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
