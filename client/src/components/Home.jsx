import React from 'react';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }



    render() {
        return (
            <div>
                <button onClick={this.props.handleSwitchView} name= 'goToStudent'>Student View</button>
                <button onClick={this.props.handleSwitchView} name= 'goToTutor'>Tutor Home</button>
                <h1>Home Page</h1>
            </div>
            
        )
    }
}


export default Home;