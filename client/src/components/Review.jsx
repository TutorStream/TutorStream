import React, { Component } from 'react';
import axios from 'axios';

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  button
} from 'reactstrap';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      tutor_id: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/feedback/${id}`).then(({ data }) => {
      this.setState({
        tutor_id: id,
        reviews: data
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.reviews.map((review, index) => {
          return (
            <Card>
              <CardBody>
                <CardTitle>{review.content}</CardTitle>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default Review;
