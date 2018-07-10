import React, { Component, Fragment } from 'react';
import axios from 'axios';
import DateTime from 'react-datetime';
import AuthService from './../Auth/AuthService';
import { Radio, FormGroup, Jumbotron, Button } from 'react-bootstrap';
import Review from './Review.jsx';

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
      test_id: undefined,
      photo: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.bookTutor = this.bookTutor.bind(this);
    this.getTutorInfo = this.getTutorInfo.bind(this);
    this.handleTestSelect = this.handleTestSelect.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  getTutorInfo() {
    const { id } = this.props.match.params;
    axios
      .get(`/tutors/${id}`)
      .then(({ data }) => {
        console.log('what is the data: ', data);
        console.log('data rating : ', data.rating)
        this.setState({
          name: data.Name,
          bio: data.Bio,
          price: data.Price,
          rating: `${data.Rating}.0`,
          id: id,
          tests: data.tests,
          test_id: this.props.test_ID
        });
      })
      .then(() => {
        return axios.get('/users/photo', {
          params: {
            user_id: this.state.id
          }
        });
      })
      .then(({ data }) => {
        this.setState({
          photo: data[0].location || 'https://cdn-images-1.medium.com/max/1200/1*MccriYX-ciBniUzRKAUsAw.png'
        });
      })
      .catch(err => {
        console.error('There was an error retrieving the tutor profile: ', err);
      });
  }

  handleChange(inputDate) {
    let months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',  
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };
    let [mm, dd, yyyy, time] = String(inputDate)
      .slice(4, 21)
      .split(' ');
    time = time + ':00';
    mm = months[mm];
    let date = `${yyyy}-${mm}-${dd}`;
    this.setState({ date, time });
  }

  handleTestSelect(e) {
    this.setState({
      test_id: e.target.value
    });
  }

  bookTutor() {
    if (AuthService.isAuthenticated) {
      axios
        .post('/sessions', {
          test_id: this.state.test_id,
          tutor_id: this.state.id,
          id: this.props.id,
          date: this.state.date,
          time: this.state.time
        })
        .then(({ data }) => {
          console.log('saved and back to client', data);
        })
        .catch(err => console.error(err));
    } else {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.getTutorInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;
    if (id !== prevState.id) {
      this.getTutorInfo();
    }
  }

  updateRating(array){
    console.log('array :', array)
    var sum = 0;
    array.forEach((review)=>{
      console.log('rating for each is : ', review.rating ,'and current sum: ',sum)
      sum += review.rating
      console.log('sum now is : ',sum)
    })
    console.log('AVG is :',sum/ array.length)
    return sum/ array.length
  }

  render() {
    return (
      <div>
        
      <Fragment>


        
        <div>
          <span style={{ 'textAlign': 'center'}}>
          <h3>{this.state.name}'s Profile</h3>
          <br />
          <div>
            <img className="img-circle" src={this.state.photo} alt="Tutor Photo" />
          </div>
          <div>
            <h1>Rating: {this.state.rating}</h1>
          </div>
          </span>
          <div>
            <h1>Bio:</h1>
            <p>{this.state.bio}</p>
          </div>
          <div>
            <h1>Tutoring Subjects:</h1>
            <span>
              <FormGroup>
                {this.state.tests.map(test => {
                  return (
                    <Radio
                      name={test.Name}
                      inline
                      key={test.id}
                      value={test.id}
                      checked={this.state.test_id == test.id}
                      onChange={e => this.handleTestSelect(e)}
                    >
                      {test.Name}
                    </Radio>
                  );
                })}
              </FormGroup>
            </span>
          </div>
          <br />
          <div>
            <DateTime
              onChange={this.handleChange}
              inputProps={{
                placeholder: "Click to select session's date and time"
              }}
            />
            <button onClick={() => this.bookTutor()}>Book Tutor session</button>
          </div>
        </div>
        <Review {...this.props} />
      </Fragment>
      </div>
    );
  }
}

export default TutorProfile;
