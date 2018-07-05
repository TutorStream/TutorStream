import React, { Component } from 'react';
import VideoChat from './VideoChat.jsx';
import WriteReview from './WriteReview.jsx';



class Classroom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          session_id : 123,
          review : false,

        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        this.setState({
            review : true
        })
    }
      
    render() {

        let conditionalDisplay = this.state.review ? <WriteReview tutor_id ={this.props.tutor_id}/> :        
         (<VideoChat room_id = {this.state.session_id} handleSubmit = {this.handleSubmit}/>);

       return(
           <div>
        {conditionalDisplay}
        </div>
            )
    }
}

export default Classroom;
