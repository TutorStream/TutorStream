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

const SessionCard = props => {
  return (
    <div className="card-border">
      <Card>
        <CardBody>
          <CardTitle><h5>{props.tests[props.session.test_id]}</h5></CardTitle>
          <CardSubtitle className="name">
            <p>{props.session.Name}</p>
            <StarRatingComponent name={`${props.session.Name}'s rating`} editing={false} starCount={props.session.Rating} value={props.session.Rating}/><br/><br/>
            <p>Date: {props.session.date.slice(0, 10)}</p><br/>
            <p>Time: {Number(props.session.time.slice(0, 2)) < 12 ? props.session.time.slice(0, 5) + ' a.m.' : String(Number(props.session.time.slice(0, 2)) - 12) + props.session.time.slice(2, 5) + ' p.m.'}</p>
          </CardSubtitle>
          <Button color="info" size="sm" onClick={() => { props.deleteSession(props.session.id); }}>
            Cancel Session
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};



export default SessionCard;
