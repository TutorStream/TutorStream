import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user_id: undefined
    };
  }





  render() {

    return (
      <div>
        <div>
          <h1> TutorStream </h1>
          <p>You have questions, we have tutors.</p>
        </div>

      </div>
    )
  }


}



export default Home;