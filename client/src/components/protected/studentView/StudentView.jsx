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
import { PageHeader, Jumbotron } from 'react-bootstrap';
import TestList from './../../un-protected/TestList.jsx';

class StudentView extends Component {
  state = {
    test_id: 1,
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
        },() => console.log(photoObj))
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
    console.log('state',this.state)
    return (
      <div>
        <Jumbotron className="container">
          <div className="row-background" />
          <hr className="my-2" />
          <br />
          <Row>
            <Col xs="6" sm="4">
              .col
            </Col>
            <Col xs="6" sm="4">
              .col
            </Col>
            <Col xs="6" sm="4">
              .col
            </Col>
          </Row>
        </Jumbotron>
        <Jumbotron className="container">
          <div className="main-info">
            <h2>Featured Tutors:</h2> <TestList setTestid={this.setTestid} />
            <Row>
              <br />
              {this.state.tutors.map(tutor => (
                <Col xs="6" sm="4" key={tutor.id}>
                  <Link to={`/tutors/${tutor.id}`}>
                    <div>
                      <Card>
                        <CardImg
                          className="img-circle"
                          top
                          width="20%"
                          src={
                            this.state.photos[tutor.id]
                          }
                          alt="default picture"
                        />
                        <CardBody>
                          <CardTitle>{tutor.Name}</CardTitle>
                          <CardText>{tutor.Bio}</CardText>
                          <CardSubtitle>{tutor.Rating}</CardSubtitle>
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
