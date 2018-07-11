import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

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
          alt="default picture"
        />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.rating}</CardSubtitle>
          <Button color="info" size="sm">
            See Profile
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TutorCard;
