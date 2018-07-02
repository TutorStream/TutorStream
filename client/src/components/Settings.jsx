import React, { Component } from 'react';
import EditableLabel from "react-inline-editing";
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';



class Settings extends Component {
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
            name: '',
            bio: '',
            tutorBio: '',
            selectedTests : [],
            price: '',
            isTutor : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
      }
      componentDidMount(){
          const {user_id: id} = this.props
          let info;
          axios.get(`/users/info/${id}`)
            .then(({data}) => {
                info = data[0]
                console.log('data recieved in settings: ', info)
                this.setState({
                    user_id: info.ID,
                    name: info.Name,
                    bio: info.Bio
                })
            })
            .then(()=>{
                console.log('state now is => ', this.state)
                console.log('info???', info)
                if(info.Tutor === 1){
                    this.setState({
                        isTutor: true
                    },()=> console.log('state now is => ', this.state))

                    axios.get(`/tutors/${id}`)
                    .then(({data}) => {
                        info = data[0]
                        console.log('data recieved in settings for tutor: ', info)
                        this.setState({
                            tutorBio: info.Bio,
                            price: info.Price
                        })
                    })
                }
            })
      }


      handleCheck(e) {
      
        var array = this.state.selectedTests.slice()
        console.log('selectedTests', array)
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


        console.log('Focused with text: ' + event.target.name);
        this.setState({
            [event.target.name] : event.target.value
        },()=>{console.log('We just updated : ', this.state)})
         
       
      }

   


      handleSubmit(event) {
       console.log('state :', this.state)
        // event.preventDefault();
        //    var testsArray = [];
        //    this.state.selectedTests.forEach((test_id)=>{
        //         testsArray.push({tutor_id : this.props.user_id,
        //             test_id : test_id})
        //    })

           var form = {
                tests: [],
                bio: this.state.tutorBio,
                rate: Number(this.state.price),
                user_id: this.state.user_id
            }
            console.log('form', form)
            axios.post(`/tutors/${this.state.user_id}`,form)
                 .then(()=>console.log('Updated tutor!'))
                 .catch((err)=>console.error(err))
        
      }
    


    render() {
        let conditionalDisplay = !this.state.isTutor ? <div>NOT A TUTOR!!</div> : (
            <div>
            <h2>Tutor settings </h2>


            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Tutor Bio</ControlLabel>
                <FormControl  maxLength= '255' componentClass="textarea" placeholder="Enter text (Max: 255 characters)" name='tutorBio' value={this.state.tutorBio} onChange={this.handleChange} />
            </FormGroup>
      
           
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Rate: (hourly)</ControlLabel>
                <FormControl
                        type="number"
                        placeholder={this.state.price}
                        name='price' value={this.state.price} onChange={this.handleChange}
                    />
            </FormGroup>

            <FormGroup>
                {this.state.tests.map((test,i)=>{
                                        return(
                                            <Checkbox onChange={this.handleCheck} inline key={i} value={test.test_id}>{test.test}</Checkbox>
                                        )
                                    })}
            
            </FormGroup>
            </div>
        );
        return (
            <div className= 'settings' >
                
                <h1>Settings</h1>
                <br/>
                <h2>User settings </h2>
                

                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl  maxLength= '255' componentClass="textarea" placeholder="Enter text (Max: 255 characters)" name='name' value={this.state.name} onChange={this.handleChange} />
                </FormGroup>
          
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Bio</ControlLabel>
                    <FormControl  maxLength= '255' componentClass="textarea" placeholder="Enter text (Max: 255 characters)" name='bio' value={this.state.bio} onChange={this.handleChange} />
                </FormGroup>
         

                <h1>_____________</h1>
                <br />
                    {conditionalDisplay}
              
                <br />
                <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>Submit</Button>
                
            </div>
            
        )
    }
}


export default Settings;
