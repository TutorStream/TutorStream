import React from 'react';


class TutorHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }



    render() {
        return (
            <div>
                <button onClick={this.props.handleSwitchView} name= 'goToHome'>Home</button>
                <button onClick={this.props.handleSwitchView} name= 'goToStudent'>Student</button>
                <h1>Tutor Home</h1>
            </div>
            
        )
    }
}


export default TutorHome;