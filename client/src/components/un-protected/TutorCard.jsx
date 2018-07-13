import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

const TutorCard = props => {
  return (
    <div>
      <Card>
        <CardImg
          className="img-circle"
          top
          width="20%"
          src={
            props.photo ||
            'https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png'
          }
          alt="profile picture"
        />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle><StarRatingComponent name={`${props.name}'s rating`} editing={false} starCount={props.rating} value={props.rating}/></CardSubtitle>
          <Button color="info" size="sm">
            See Profile
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TutorCard;
