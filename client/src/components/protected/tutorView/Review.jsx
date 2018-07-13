import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle } from 'reactstrap';

class Review extends Component {
  state = {
    reviews: [],
    tutor_id: null,
    averageRating: null
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/feedback/${id}`).then(({ data }) => {
      this.setState(
        {
          tutor_id: id,
          reviews: data
        },
        () => {
          this.setState(
          {
            averageRating: this.getAverage(data)  
          });
        }
      );
    });
  }

  getAverage = array => {
    var sum = 0;
    array.forEach(review => {
      sum += review.rating;
    });
    return sum / array.length;
  };

  render() {
    return (
      <div>
        {this.state.reviews.map((review, index) => {
          return (
            <Card>
              <CardBody>
                <CardTitle> {`${review.rating}.0`}</CardTitle>
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
