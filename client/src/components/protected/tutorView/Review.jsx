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
      tutor_id: null,
      averageRating: null
    };
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    axios.get(`/feedback/${id}`).then(({ data }) => {
      this.setState({
        tutor_id: id,
        reviews: data,
      },()=>{
        console.log('Reviews',this.state.reviews)
        this.setState({
          averageRating : this.getAverage(data)
        },()=>console.log('this.state updated average: ',this.state))
        
      });
    });
  }

  getAverage = (array) => {
    console.log('array :', array)
    var sum = 0;
    array.forEach((review)=>{
      console.log('rating for each is : ', review.rating ,'and current sum: ',sum)
      sum += review.rating
      console.log('sum now is : ',sum)
    })
    console.log('AVG is :',sum/ array.length)
    return sum/ array.length
  }

  render () {
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
