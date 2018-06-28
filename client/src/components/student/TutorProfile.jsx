import React, { Component } from 'react';
import axios from 'axios';


//tutor profile component that renders on tutor profile click
class TutorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: null,
      bio: '',
      tests: [],
      feedback: [],
      availability: null
    };
  }

  componentDidMount() {
    // axios get request to get relevant tutor profile information and set to state
    /*
    
      axios.get(`/tutors/${this.props.tutor_id}`)
        .then((result) => {
          this.setState({
            name: result.data.name,
            rating: result.data.rating,
            bio: result.data.bio,
            tests: result.data.tests,
            feedback: result.data.feedback,
            availability: result.data.availability
          });
        })
        .catch((err) => {
          console.error('There was an error retrieving the tutor profile: ', err);
        });

    */
  }

  render() {
    return (
      <div>
        <h3>Koichi Smith's Profile</h3>
        <div>
          <h1>Rating: { /* this.state.rating */}</h3>
        </div>
        <div>
          <h1>Bio:</h1>
            <p>{ /* this.state.bio */ }</p>
        </div>
        <div>
          <h1>Tests:</h1>
            <ul>
            { /* this.state.tests.map((test) => { <li key={test.id}>{test.name}</li> }) */}
            </ul>
        </div>
        <div>
          <h1>Feedback:</h1>
            <ul>
              { /* this.state.feedback.map((review) => { <li key={review.id}>{ review.content }</li> }) */}
            </ul>
        </div>
        <div>
          <button onClick={ /* handle opening component to book tutor session */ }>Book Session</button>
        </div>
      </div>
    )
  }
}

export default TutorProfile;