import React from 'react';
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';

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

            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
      }

      handleCheck(e) {
        console.log("You've checked" , e.target.value);
        var array = this.state.selectedTests.slice()
        if(array.indexOf(e.target.value) === -1){
            this.setState({
                selectedTests : [...this.state.selectedTests, e.target.value]
            }, ()=>console.log(this.state.selectedTests))
        }else {
            ///continue HERE!!!!
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
            console.log('We just updated : ', this.state.rate)
        });
      }
    
      handleSubmit(event) {
       
        event.preventDefault();
        
           var form = {
                tests: [
                    {tutor_id : this.props.user_id,
                     test_id : this.state.test}
                ],
                bio: this.state.bio,
                rate: Number(this.state.rate),
                user_id: this.props.user_id
            }
            console.log('form', form)
            axios.post(`/tutors/${this.props.user_id}`,form)
                 .then(()=>console.log('back to the front'))
                 .catch((err)=>console.error(err))
        
      }
    



    render() {
        return (
            <div className='tutor-registration'>
                <h1>Tutor Registration</h1>
                <br/><br/>
                {/* <div className='student-main'>

                    <form onSubmit={this.handleSubmit}>
                        
                        Bio:
                        <br/>
                        <textarea type="text" className='tutor-bio' name='bio' value={this.state.bio} onChange={this.handleChange} placeholder='Bio'/>
                        <br/>
                        Rate per hour:
                        <br/>
                        <input type="text" className='tutor-rate' name='rate' value={this.state.rate} onChange={this.handleChange} placeholder='$$$'/>
                        <label>Test : {this.state.test.test}</label>
                        <br/>
                        <select className='select-test' value={this.state.test} name='test' onChange={this.handleChange}>
                                    <option value=''>Select</option>
                            {this.state.tests.map((test,i)=>{
                                return(
                                    <option key={i} value={test.test_id}>{test.test}</option>
                                )
                            })}
                        </select>
                        <br/>     
                        <input className='submit' type="submit" value="Submit" />
                        <br/>

                        
                    </form>
                </div> */}

    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Bio</ControlLabel>
      <FormControl  maxLength= '255' componentClass="textarea" placeholder="Enter text (Max: 255 characters)" name='bio' value={this.state.bio} onChange={this.handleChange} />
    </FormGroup>
     <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Rate: (hourly)</ControlLabel>
    <FormControl
            type="number"
            value={this.state.value}
            placeholder="$$$"
            name='rate' value={this.state.rate} onChange={this.handleChange}
          />
          </FormGroup>
    

    
    <FormGroup>
    {this.state.tests.map((test,i)=>{
                                return(
                                    <Checkbox onChange={this.handleCheck} inline key={i} value={test.test_id}>{test.test}</Checkbox>
                                )
                            })}
      
    </FormGroup>
    <Button bsStyle="success" type="submit">Submit</Button>
    {/* // <FormGroup>
    //   <ControlLabel>Static text</ControlLabel>
    //   <FormControl.Static>email@example.com</FormControl.Static>
    // </FormGroup> */}
     



            </div>
            
            
        )
    }
}


export default TutorRegistration;