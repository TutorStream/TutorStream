import React from 'react';
import axios from 'axios';


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
            bio: '',
            rate: 0,
            form: {

            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
         
        this.setState({ [event.target.name]: event.target.value},()=>{
            console.log('We just updated : ')
        });
      }
    
      handleSubmit(event) {
       
        event.preventDefault();
        
           var form = {
                test: this.state.test,
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
                <div className='student-main'>

                    <form onSubmit={this.handleSubmit}>
                        
                        Bio:
                        <input type="text" name='bio' value={this.state.bio} onChange={this.handleChange} placeholder='Bio'/>
                        Rate per hour:
                        <input type="text" name='rate' value={this.state.rate} onChange={this.handleChange} placeholder='$$$'/>
                        <label>Test : {this.state.test.test}</label>
                        <select value={this.state.test} name='test' onChange={this.handleChange}>
                                    <option value=''>Select</option>
                            {this.state.tests.map((test,i)=>{
                                return(
                                    <option key={i} value={test.test_id}>{test.test}</option>
                                )
                            })}
                        </select>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            
            
        )
    }
}


export default TutorRegistration;