import React, { Component } from 'react';
import axios from 'axios';
import DateTime from 'react-datetime';
import AuthService from './../Auth/AuthService';
import { Radio, FormGroup } from 'react-bootstrap';

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
      id: null,
      test_id: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.bookTutor = this.bookTutor.bind(this);
    this.getTutorInfo = this.getTutorInfo.bind(this);
    
  }
  getTutorInfo(){
    const { id } = this.props.match.params;
      axios.get(`/tutors/${id}`)
        .then(({data}) => {
          this.setState({
            name: data.Name,
            rating: data.Rating,
            bio: data.Bio,
            price: data.Price,
            id: id,
            tests: data.tests
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
  
  // test id is either sent as props || this.state.test_id
  handleTestSelect(test_id) {

  }

  bookTutor(){
    if (AuthService.isAuthenticated) {
      axios.post('/sessions', {
        test_id : this.props.test_ID,
        tutor_id : this.props.tutor_id,
        id : this.props.id,
        date : this.state.date,
        time : this.state.time
      })
      .then(({data}) =>  {
        console.log('saved and back to client', data);
      })
      .catch((err)=>console.error(err));
    } else {
      this.props.history.push('/login');
    }
  }
        
  componentDidMount() {
    this.getTutorInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    const { ID } = this.props.match.params;
      if(ID !== prevState.ID) {
        this.getTutorInfo();
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
          <h1>Tutoring Subjects:</h1>
          <span>
          <FormGroup>
          { this.state.tests.map((test) => {return <Radio name="radioGroup" inline key={test.ID}>{ test.Name }</Radio> }) } 
          </FormGroup>
          </span>
        </div>
        <br /><br />
        <div>
          <DateTime onChange={this.handleChange} inputProps={{ placeholder: "Click to select session's date and time"}}/>
          <button onClick={()=>this.bookTutor()}>Book Tutor session</button>
        </div>
      </div>
    )
  }
}

export default TutorProfile;