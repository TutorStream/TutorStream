import React, { Component } from 'react';
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';
// import StarRating from 'react-star-rating';
import ReactStars from 'react-stars'

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  button
} from 'reactstrap';

class WriteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      tutor_id: this.props.tutor_id,
      rating: null
    };
    this.ratingChanged = this.ratingChanged.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.change = this.change.bind(this)
  }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value},()=>{
            console.log('We just updated : ', this.state.feedback)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('State now is : ', this.state)
        // var testsArray = [];
        // this.state.selectedTests.forEach((test_id)=>{
        //         testsArray.push({tutor_id : this.props.id,
        //             test_id : test_id})
        // })
        // var form = {
        //         tests: testsArray,
        //         bio: this.state.bio,
        //         rate: Number(this.state.rate),
        //         id: this.props.id
        //     }
        //     console.log('form', form)
        //     axios.post(`/tutors/${this.props.id}`,form)
        //         .then(()=>console.log('Updated and registered as tutor!'))
        //         .catch((err)=>console.error(err)) 
    }

    change(rating){
        this.setState({
            rating: 5
        })
    }

    ratingChanged(newRating){
        console.log(newRating)
        this.change(newRating)
      }




  render() {
    return (
     <div>
         <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Feedback</ControlLabel>
            <FormControl  maxLength= '255' componentClass="textarea" placeholder="Leave feedback (Max: 255 characters)" name='feedback' value={this.state.feedback} onChange={this.handleChange} />
        </FormGroup>
        <br/>
       
        
        <ReactStars
  count={5}
  onChange={this.ratingChanged}
  size={24}
  value = {4}
  color2={'#ffd700'} />
        <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>Submit</Button>
        
            
     </div>
    );
  }
}

export default WriteReview;
