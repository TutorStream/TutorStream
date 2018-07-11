import React from 'react';
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';
import Earnings from './Earnings.jsx';

class TutorRegistration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tests: [
                {test:'DAT', test_id: '1'},
                {test:'LSAT', test_id: '2'},
                {test:'SAT', test_id: '3'},
                {test:'GRE', test_id: '4'},
                {test:'GMAT', test_id: '5'},
                {test:'HR TA', test_id: '6'}
            ],
            test: '',
            selectedTests : [],
            bio: '',
            rate: '',
            form: {

            },
         
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
      }

      handleCheck(e) {
        console.log("lets check props : " , this.props);
        var array = this.state.selectedTests.slice()
        if(array.indexOf(e.target.value) === -1){
            this.setState({
                selectedTests : [...this.state.selectedTests, e.target.value]
            }, ()=>console.log(this.state.selectedTests))
        }else {
         
            var idx = array.indexOf(e.target.value)
            console.log('idx', idx)
            array.splice(idx,1)
            this.setState({
                selectedTests : array
            }, ()=>console.log(this.state.selectedTests))
        }
      }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value},()=>{
            console.log('We just updated : ', this.state.bio,' and ', this.state.rate)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
           var testsArray = [];
           this.state.selectedTests.forEach((test_id)=>{
                testsArray.push({tutor_id : this.props.id,
                    test_id : test_id})
           })

           var form = {
                tests: testsArray,
                bio: this.state.bio,
                rate: Number(this.state.rate),
                id: this.props.id
            }
            console.log('form', form)
            axios.post(`/tutors/${this.props.id}`,form)
                 .then(()=>console.log('Updated and registered as tutor!'))
                 .catch((err)=>console.error(err))
        
      }
    render() {
        
        let conditional = this.props.isTutor > -1? <div><Earnings id={this.props.id}/></div>: 
        <div> <h1>Tutor Registration</h1>
        <br/><br/>
        <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Bio</ControlLabel>
        <FormControl  maxLength= '255' componentClass="textarea" placeholder="Enter text (Max: 255 characters)" name='bio' value={this.state.bio} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Rate: (hourly)</ControlLabel>
        <FormControl
                type="number"
                placeholder="$$$"
                name='rate' value={this.state.rate} onChange={this.handleChange}
            />
        </FormGroup>

        <FormGroup>
        {this.state.tests.map((test,i) => {
            return(
                <Checkbox onChange={this.handleCheck} inline key={i} value={test.test_id}>{test.test}</Checkbox>
            )
        })}
        
        </FormGroup>
        <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>Submit</Button></div>
        return (
            <div className='tutor-registration'>
               {conditional}
            </div> 
        )
    }
}

export default TutorRegistration;