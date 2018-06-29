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
      price: null,
      id: null
    };
    this.getTutorInfo = this.getTutorInfo.bind(this)
  }
  getTutorInfo(){
    console.log('in here')
    const { id } = this.props.match.params
    console.log(id)
    // axios get request to get relevant tutor profile information and set to state
      axios.get(`/tutors/${id}`)
        .then(({data}) => {
          let tutor = data[0]
          this.setState({
            name: tutor.Name,
            rating: tutor.Rating,
            bio: tutor.Bio,
            price: tutor.Price,
            id: id
          });
        })
        .catch((err) => {
          console.error('There was an error retrieving the tutor profile: ', err);
        });
  }

  componentDidMount() {
    this.getTutorInfo()
  }
  componentDidUpdate(prevProps, prevState) {
      const { id } = this.props.match.params
      if(id !== this.state.id) {
        this.getTutorInfo()
      }      
  }

  render() {
    
    return (
      <div>
        <h3>{this.state.name}'s Profile</h3>
        <div>
          <h1>Rating: { this.state.rating}</h1>
        </div>
        <div>
          <h1>Bio:</h1>
            <p>{ this.state.bio }</p>
        </div>
        <div>
          <button>Book Session</button>
        </div>
      </div>
    )
  }
}

export default TutorProfile;