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
            tutorHome: false,
            tutor: false ,
            settings: false
        }
        this.goToHome = this.goToHome.bind(this)
        this.tutorHome = this.tutorHome.bind(this)
        this.goToStudent = this.goToStudent.bind(this)
        this.handleSwitchView = this.handleSwitchView.bind(this)
        this.tutor = this.tutor.bind(this)
        this.settings = this.settings.bind(this)
    }

    goToStudent(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : true,
            tutorHome : false,
            tuturRegistration: false 
        })
    }

    tutorHome(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : false,
            tutorHome : true,
            tuturRegistration: false 
        })
    }

    goToHome(){
        this.setState({
            homepage : true,
            isStudentLoggedIn : false,
            tutorHome : false,
            tuturRegistration: false 
        })
    }

    settings(){
        this.setState({
            homepage: false,
            isStudentLoggedIn: false,
            tutorHome: false,
            tutor: false ,
            settings: true
        })

    }

    handleSwitchView(e){
        console.log('handling switch view', e.target.name)
            this[e.target.name]()
    }

    tutor(){
        this.setState({
            homepage : false,
            isStudentLoggedIn : false,
            tutorHome : false,
            tutor: true
        })
    }

    render() {
        if(this.state.homepage){
            return <Home handleSwitchView={this.handleSwitchView}/>  
        } else if(this.state.isStudentLoggedIn){
            return <StudentView handleSwitchView={this.handleSwitchView}/>
        }else if(this.state.tutorHome){
            return <TutorHome handleSwitchView={this.handleSwitchView}/>
        }else if(this.state.tutor){
            return <TutorRegistration handleSwitchView={this.handleSwitchView} tutorHome={this.tutorHome}/>
        }else if(this.state.settings){
            return <Settings handleSwitchView={this.handleSwitchView}/>
        }
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))