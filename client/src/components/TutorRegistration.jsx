import React, { Component } from 'react';

class TutorRegistration extends Component {
    constructor(props){
        super(props);
        this.state = {
            tests: ['DAT','LSAT','SAT','GRE','GMAT','Hack Reactor T A'],
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
        this.setState({
            form: {
                test: this.state.test,
                bio: this.state.bio,
                rate: Number(this.state.rate)
            }
        },()=>{
            console.log('form collected', this.state.form);
            this.props.tutorHome();
        })
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
                        <label>Test : {this.state.test}</label>
                        <select value={this.state.test} name='test' onChange={this.handleChange}>
                                    <option value=''>Select</option>
                            {this.state.tests.map((test,i)=>{
                                return(
                                    <option key={i} value={test}>{test}</option>
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