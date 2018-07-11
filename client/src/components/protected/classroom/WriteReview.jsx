import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import StarRatingComponent from 'react-star-rating-component';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  button
} from 'reactstrap';

class WriteReview extends Component {
  state = {
    isTutor: 0,
    feedback: '',
    tutor_id: this.props.tutor_id,
    rating: 1,
    submitted: false,
    activeSession: this.props.activeSession
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log('We just updated : ', this.state.feedback);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('State now is : ', this.state);
    //need to refactor below to match desired purposes
    var form = {
      feedback: this.state.feedback,
      tutor_id: this.props.tutor_id,
      rating: this.state.rating,
      user_id: this.props.activeSession.student_id,
      date: this.props.activeSession.date.slice(0, 10),
      time: this.props.activeSession.time
    };
    console.log('form', form);
    axios
      .post(`/feedback/${this.state.tutor_id}`, form)
      .then(() => {
        console.log('Updated Feedback!');
        this.setState({
          submitted: true
        });
      })
      .catch(err => console.error(err));
  };

  onStarClick = nextValue => {
    this.setState({ rating: nextValue });
  };

  onStarClick = nextValue => {
    this.setState({ rating: nextValue });
  };

  render() {
    const { rating } = this.state;

    if (this.state.submitted || this.props.isTutor) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>
            <h2>Feedback</h2>
          </ControlLabel>
          <FormControl
            maxLength="255"
            componentClass="textarea"
            placeholder="Leave feedback (Max: 255 characters)"
            name="feedback"
            value={this.state.feedback}
            onChange={this.handleChange}
          />
        </FormGroup>
        <br />
        <h2>Rate your tutor: {rating}</h2>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick}
        />
        <br />
        <br />
        <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default WriteReview;
