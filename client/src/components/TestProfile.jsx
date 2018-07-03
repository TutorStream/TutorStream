import React, { Component } from 'react';
import axios from 'axios';
import TutorCard from './TutorCard.jsx';

//passing test id as props into TestProfile -- assuming this.props.test_id
class TestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      name: '',
      description: '',
      tutors: []
    };
  }

  getTestInfo(test_id) {
    axios.get(`/tests/${test_id}`)
      .then(({data}) => {
        this.setState({
          name: data.Name,
          description: data.Description
        });
      })
      .catch((err) => {
        console.error('There was an error getting your test info: ', err);
      });
  }

  getTutors(test_id) {
    axios.get(`/tutors/selectTutors`, {
      params: {
        test_id: test_id
      }
    })
      .then(({data}) => {
        this.setState({
          tutors: data
        });
      })
      .catch((err) => {
        console.error('There was an error getting the tutors for this test: ', err);
      });
  }

  componentDidMount() {
    this.getTestInfo(this.props.test_id);
    this.getTutors(this.props.test_id);
  }

  render() {
    return (
      <div>
        <div className="test-info">
          <span>
            <h5>{this.state.name}</h5>
          </span>
          <br/><br/>
          <p>{this.state.description}</p>
        </div>
        <hr />
        <div>
          { this.state.tutors.map((tutor) => <TutorCard handleProfileClick={} key={tutor.ID} name={tutor.Name} rating={tutor.Rating} photo={/* profile img to render */}/>) }
        </div>
      </div>
    )
  }
}

export default TestProfile;