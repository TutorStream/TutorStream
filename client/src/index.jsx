import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home.jsx'
import TutorHome from './components/tutor/TutorHome.jsx'
import StudentView from './components/student/StudentView.jsx'
import TutorRegistration from './components/student/TutorRegistration.jsx'

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            homepage: true,
            isStudentLoggedIn: false,
            isTutorLoggedIn: false,
            tuturRegistration: false 
        }
        this.goToHome = this.goToHome.bind(this)
        this.goToTutor = this.goToTutor.bind(this)
        this.goToStudent = this.goToStudent.bind(this)
        this.handleSwitchView = this.handleSwitchView.bind(this)
        this.becomeTutor = this.becomeTutor.bind(this)
    }

    goToStudent(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : true,
            isTutorLoggedIn : false,
            tuturRegistration: false 
        })
    }

    goToTutor(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : false,
            isTutorLoggedIn : true,
            tuturRegistration: false 
        })
    }

    goToHome(){
        this.setState({
            homepage : true,
            isStudentLoggedIn : false,
            isTutorLoggedIn : false,
            tuturRegistration: false 
        })
    }

    handleSwitchView(e){
        console.log('handling switch view', e.target.name)
            this[e.target.name]()
        
    }

    becomeTutor(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : false,
            isTutorLoggedIn : false,
            tuturRegistration: true
        })
    }

    render() {
        if(this.state.homepage){
            return <Home handleSwitchView={this.handleSwitchView}/>  
        } else if(this.state.isStudentLoggedIn){
            return <StudentView handleSwitchView={this.handleSwitchView}/>
        } else if(this.state.isTutorLoggedIn){
            return <TutorHome handleSwitchView={this.handleSwitchView}/>
        } else if(this.state.tuturRegistration){
            return <TutorRegistration handleSwitchView={this.handleSwitchView} goToTutor={this.goToTutor}/>
        }
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))