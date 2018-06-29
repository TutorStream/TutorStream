import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import moment from 'moment';
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
      id: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.bookTutor = this.bookTutor.bind(this);
    this.getTutorInfo = this.getTutorInfo.bind(this)
    
  };

getTutorInfo(){
  const id  = this.props.tutor_id
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
      }).catch((err) => {
        console.error('There was an error retrieving the tutor profile: ', err);
      });
}

  handleChange(date) {
    var sliced = String(date).slice(4,21)
    var newTime = sliced.slice(12) + ':00'
    var mm;
    
      if(sliced.slice(0,3) === 'Jan'){
        mm ='01'
      }else if(sliced.slice(0,3) === 'Feb'){
        mm = '02'
      }else if(sliced.slice(0,3) === 'Mar'){
        mm = '03'
      }else if(sliced.slice(0,3) === 'Apr'){
        mm = '04'
      }else if(sliced.slice(0,3) === 'May'){
        mm = '05'
      }else if(sliced.slice(0,3) === 'Jun'){
        mm = '06'
      }else if(sliced.slice(0,3) === 'Jul'){
        mm = '07'
      }else if(sliced.slice(0,3) === 'Aug'){
        mm = '08'
      }else if(sliced.slice(0,3) === 'Sep'){
        mm = '09'
      }else if(sliced.slice(0,3) === 'Oct'){
        mm = '10'
      }else if(sliced.slice(0,3) === 'Nov'){
        mm = '11'
      }else if(sliced.slice(0,3) === 'Dec'){
        mm = '12'
      }

      var dd = sliced.slice(4,6);
      var yyyy = sliced.slice(7,11)
      var newDate = yyyy + '-' + mm + '-' + dd
      console.log('New date: ',newDate)
      console.log('New Time : ',newTime)

          this.setState({
            date: newDate,
            time: newTime
          })
        }
  
      bookTutor(){
      
        console.log('user id:', this.props.user_id,'test id: ',this.props.test_ID, 'tutorID: ',this.props.tutor_id )
        axios.post('/sessions', {
          userId : this.props.user_id,
          testId : this.props.test_ID,
          tutorId : this.props.tutor_id,
          date : this.state.date
        })
        .then(()=>console.log('saved and back to front'))
        .catch((err)=>console.error(err))
      }
        

  componentDidMount() {
    this.getTutorInfo()
  }
  componentDidUpdate(prevProps, prevState) {
      if(prevProps.tutor_id !== this.props.tutor_id) {
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