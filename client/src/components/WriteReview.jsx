import React, { Component } from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Radio,
  FieldGroup,
  Button
} from 'react-bootstrap';
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
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      tutor_id: this.props.tutor_id,
      rating: 1,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      console.log('We just updated : ', this.state.feedback);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('State now is : ', this.state);
    //need to refactor below to match desired purposes
    // var form = {
    //     tests: testsArray,
    //     tutorBio: this.state.tutorBio,
    //     rate: Number(this.state.price),
    //     id: this.state.id,
    //     userBio: this.state.bio,
    //     name:this.state.name,
    //     isTutor: this.state.isTutor
    // }
    // console.log('form', form)
    // axios.post(`/feedback/${this.state.tutor_id}`,form)
    //      .then(()=>{
    //          console.log('Updated tutor!');
    //          this.setState({
    //              submitted : true
    //          })
    //      })
    //      .catch((err)=>console.error(err))

    this.setState({
      submitted: true
    });
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    if (this.state.submitted) {
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
