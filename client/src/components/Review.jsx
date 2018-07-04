import React, { Component } from 'react';
import axios from 'axios';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutor_id: null
    };
  }

  render() {
    return (
      <div>
        <h1>Reviews</h1>
      </div>
    );
  }
}

export default Review;
