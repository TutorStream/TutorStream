import React, { Component } from 'react';
import axios from 'axios';
import  DateTime  from 'react-datetime';

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
      availability: null,
      date: '',
      time: '',
      price: null,
      ID: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.bookTutor = this.bookTutor.bind(this);
    this.getTutorInfo = this.getTutorInfo.bind(this)
    
  };

  getTutorInfo(){
    const { ID } = this.props.match.params 
      axios.get(`/tutors/${ID}`)
        .then(({data}) => {
          let tutor = data[0]
          this.setState({
            name: tutor.Name,
            rating: tutor.Rating,
            bio: tutor.Bio,
            price: tutor.Price,
            ID: ID
          });
        }).catch((err) => {
          console.error('There was an error retrieving the tutor profile: ', err);
        });
  }

  handleChange(inputDate) {
    let months = {
      'Jan': '01',
      'Feb':'02',
      'Mar':'03',
      'Apr':'04',
      'May':'05',
      'Jun':'06',
      'Jul':'07',
      'Aug':'08',
      'Sep':'09',
      'Oct':'10',
      'Nov':'11',
      'Dec':'12'
    }
    let [mm,dd,yyyy,time] = String(inputDate).slice(4, 21).split(' ')
    time = time + ':00'
    mm = months[mm]
    let date = `${yyyy}-${mm}-${dd}`
    this.setState({date,time})
  }
  
  bookTutor(){
    axios.post('/sessions', {
      test_id : this.props.test_ID,
      tutor_id : this.props.tutor_id,
      user_id : this.props.user_id,
      date : this.state.date,
      time : this.state.time
    })
    .then(({data}) =>  {
      console.log('saved and back to client', data);
    })
    .catch((err)=>console.error(err))
  }
        
  componentDidMount() {
    this.getTutorInfo()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ID } = this.props.match.params 
      if(ID !== prevState.ID) {
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
      <DateTime onChange={this.handleChange} inputProps={{ placeholder: "Click to select session's date and time"}}/>
      <button onClick={()=>this.bookTutor()}>Book Tutor session</button>
     
    </div>
      </div>
    )
  }
}

export default TutorProfile;