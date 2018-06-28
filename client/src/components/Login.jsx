import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: ''
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.handeLoginSubmit = this.handeLoginSubmit.bind(this);
  }

  inputHandler (e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handeLoginSubmit (e) {
    e.preventDefault();
    axios.post('/users/login', {
      Email : this.state.Email,
      Password: this.state.Password
    })
    .then(({data}) => {
      var id = data[0].ID
      console.log(id, 'id');
      this.props.getID(id);
      console.log('data ', data);
      if(data.length) {
        this.props.history.push('/student');
      }
      
      // no need to set state, simply re-direct to approved login page 
        // OR if not authetnicated, sned back "error, not authenticated user"
      // re-direct view to user homepage? or tutor homepage

    })
    .catch((err) => {
      console.error(err);
    })
  }

  render () {
    return (
      <div>
        <form onSubmit={(e) => {this.handeLoginSubmit(e)}}>
          <label>Email</label>
          <input value={this.state.Email} name="Email" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <label>Password</label>
          <input type="password" value={this.state.loginPassword} name="Password" onChange={(e) => {this.inputHandler(e)}}></input>
          <br></br>
          <button type="submit" value="Submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;