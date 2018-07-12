import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col , Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button} from 'reactstrap';
import { PageHeader, Jumbotron } from 'react-bootstrap';
import TestList from './../../un-protected/TestList.jsx';

class StudentView extends Component {
  state = {
    test_id: 1,
    tutor_id: null,
    tutors: []
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
        <Jumbotron className="container">
        <div className="row-background">
   
        </div>
        <hr className="my-2" />
        <br />
        <Row>
        <Col xs="6" sm="4">.col</Col>
          <Col xs="6" sm="4">.col</Col>
          <Col xs="6" sm="4">.col</Col>

  
        </Row>
      </Jumbotron>
        <Jumbotron className="container">
            {/* {this.state.tutors.map((tutor, i) => {
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
            })} */}

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
                            tutor.photo ||
                            'https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png'
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
