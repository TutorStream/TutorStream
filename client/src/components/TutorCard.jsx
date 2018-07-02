import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const TutorCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="https://images7.alphacoders.com/633/633262.png" alt="profile picture" />
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <CardSubtitle>{props.rating}</CardSubtitle>
          <Button onClick={() => props.handleProfileClick(props.key)}>See Profile</Button>
        </CardBody>
      </Card>
    </div>
  )
};

export default TutorCard;