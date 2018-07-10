import React, { Component } from 'react';
import EditableLabel from "react-inline-editing";
import axios from 'axios';
import {FormGroup , ControlLabel, FormControl, Checkbox, Radio, FieldGroup, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            tests: [
                {test:'DAT', test_id: 1},
                {test:'LSAT', test_id: 2},
                {test:'SAT', test_id: 3},
                {test:'GRE', test_id: 4},
                {test:'GMAT', test_id: 5},
                {test:'HR TA', test_id: 6}
            ],
            test: '',
            name: '',
            bio: '',
            tutorBio: '',
            selectedTests : [],
            price: '',
            isTutor : false,
            submitted: false,
            preSelected: []
        }
        this.isPreselectedTests = this.isPreselectedTests.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
      }
      componentDidMount(){
          const {id: id} = this.props
          let info;
          axios.get(`/users/info/${id}`)
            .then(({data}) => {
                info = data[0]
                console.log('data recieved in settings: ', info)
                this.setState({
                    id: info.id,
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
                        info = data
                        console.log('DATA HERE>>>>>: ', info)
                        var preselected = []
                        info.tests.forEach((test)=>{
                            preselected.push(Number(test.test_id))
                        })

                        this.setState({
                            tutorBio: info.Bio,
                            price: info.Price,
                            selectedTests: preselected
                        })
                    })
                }
            })
      }


      handleCheck(e) {
      
        var array = this.state.selectedTests.slice()
        console.log('selectedTests', array)
        if(array.indexOf(Number(e.target.value)) === -1){
            this.setState({
                selectedTests : [...this.state.selectedTests, e.target.value]
            }, ()=>console.log(this.state.selectedTests))
        }else {
            ///continue HERE!!!!
            var idx = array.indexOf(Number(e.target.value))
            console.log('idx', idx)
            array.splice(idx,1)
            this.setState({
                selectedTests : array
            }, ()=>console.log(this.state.selectedTests))
        }
      }

      handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        },()=>{console.log('We just updated : ', this.state)})
      }

      isPreselectedTests(id){
          console.log('Id recieved is ',id, )
          if(this.state.selectedTests.indexOf(id) !== -1){
              console.log('It is in preselected : ',id)
              return true;
          }else{
              return false
          }
      }

   
      handleSubmit(event) {
           event.preventDefault();
       console.log('state :', this.state)
       
           var testsArray = [];
           this.state.selectedTests.forEach((test_id)=>{
                testsArray.push({tutor_id : this.props.id,
                    test_id : Number(test_id)})
           })

           var form = {
                tests: testsArray,
                tutorBio: this.state.tutorBio,
                rate: Number(this.state.price),
                id: this.state.id,
                userBio: this.state.bio,
                name:this.state.name,
                isTutor: this.state.isTutor
            }
            console.log('form', form)
            axios.post(`/users/${this.state.id}`,form)
                 .then(()=>{
                     console.log('Updated tutor!');
                     this.setState({
                         submitted : true
                     })
                 })
                 .catch((err)=>console.error(err))
        
      }
    


    render() {
        let conditionalDisplay = !this.state.isTutor ? <div></div> : (
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
                                            <Checkbox onChange={this.handleCheck} inline key={i} value={Number(test.test_id)} checked={(this.isPreselectedTests(test.test_id)? "checked" : undefined)}>{test.test}</Checkbox>
                                        )
                                    })}
            
            </FormGroup>
            </div>
        );

        if (this.state.submitted) {
            return <Redirect to="/" />
          }
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
                
                    {conditionalDisplay}
                <br />
                <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>Submit</Button>
                
            </div>
            
        )
    }
}


export default Settings;
