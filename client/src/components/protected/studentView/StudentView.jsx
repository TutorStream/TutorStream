import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import { PageHeader, Jumbotron, Image} from 'react-bootstrap';
import TestList from './../../un-protected/TestList.jsx';
import StarRatingComponent from 'react-star-rating-component'
// const img = require('./../../../../dist/assets/brainstorm.png')

class StudentView extends Component {
  state = {
    test_id: 5,
    tutor_id: null,
    tutors: [],
    photos: {}
  };

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
        let idList = data.map(tutor => tutor.id).join(', ');
        return axios.get('/tutors/photo', {
          params: {
            idList
          }
        });
      })
      .then(({data})=>{
        let photoObj = data.reduce((acc, item) => {
          acc[item.user_id] = item.location
          return acc
        }, {})
        this.setState({
          photos: photoObj
        })
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
    this.getSelectTutors();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.test_id !== this.state.test_id) {
      this.getSelectTutors()
    }
  }

  render() {

    return (
      <div>
        <div className="row-background" />
        <Jumbotron className="container">
        <Row className="find-tutor-icons">
          <Col xs={6} md={4}>
      <Image className='calculation' circle />
    </Col>
            <Col xs="6" sm="4">
            <Image className='brain' circle />
            </Col>
            <Col xs="6" sm="4">
            <Image className='notebook' circle />
            </Col>
          </Row>
          <div className="main-info">
            <h2>Featured Tutors:</h2> <TestList setTestid={this.setTestid} />
            <Row>
              <br />
              {this.state.tutors.map(tutor => (
                <Col xs="6" sm="4" key={tutor.id}>
                  <Link to={`/tutors/${tutor.id}`}>
                    <div>
                      <Card>
                        <Image
                          src={
                            this.state.photos[tutor.id]
                          }
                          circle
                          alt="default picture"
                        />
                        <CardBody>
                          <CardTitle>{tutor.Name}</CardTitle>
                          <CardSubtitle>
                          <StarRatingComponent name={`${tutor.Name}'s rating`} editing={false} starCount={tutor.Rating} value={tutor.Rating}/>
                          </CardSubtitle>
                          <Button color="info" size="sm">
                            See Profile
                          </Button>
                        </CardBody>
                      </Card>
                    </div>
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

export default StudentView;
