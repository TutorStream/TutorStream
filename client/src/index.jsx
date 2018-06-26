import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home.jsx'
import TutorHome from './components/tutor/TutorHome.jsx';
import { BrowserRouter, Route, Router, Link, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            homepage : true,
            isStudentLoggedIn: false,
            isTutorLoggedIn: false
        }
    }

    render() {
        if(this.state.homepage){
            return <Home isStudentLoggedIn={this.state.isStudentLoggedIn}/>  
        }else if(isStudentLoggedIn){
            return <StudentView />
        }else if(isTutorLoggedIn){
            return <TutorHome />
        }        
    }
}


ReactDOM.render( <App/>, document.getElementById('app'))