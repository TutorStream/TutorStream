import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Home from './components/Home.jsx'
import TutorHome from './components/tutor/TutorHome.jsx'
import StudentView from './components/student/StudentView.jsx'
import TutorRegistration from './components/student/TutorRegistration.jsx'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Sidebar from './components/Sidebar.jsx'
import Sessions from './components/student/Sessions.jsx'
import Settings from './components/Settings.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID : null,
      Tests: []
    }
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getID (ID) {
    this.setState({
      ID : ID
    }, () => {
      console.log('index state updated ', this.state.ID);
    })
  }

  getAllTests () {
    axios.get('/tests', {
      params : {
        user_id : this.state.ID
      }
    })
    .then(({data}) => {
      console.log('should be tests', data);
      this.setState({
        Tests : data
      })
    }, () => {
      console.log('selected tests', this.state.userTests);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getAllTests();
  }

  render() {
    // pass down user id to student view
    // pass down tutor id
    const studentView = () => {
      return <StudentView ID={this.state.ID} Tests={this.state.Tests} />
    }
    const tutorRegistration = () => {
      return <TutorRegistration ID={this.state.ID}  Tests={this.state.Tests}/>
    }

    return (
    <BrowserRouter> 
      <Switch>
        <Route exact path = "/" render={(props) => {
            return (<div>
                <Login {...props} ID={this.state.ID} getID={this.getID}/>
                <Signup {...props} Tests={this.state.Tests}/>
            </div>);
        }}
        >
        </Route>
        <Route exact path = "/student" render={studentView}></Route>
        <Route exact path = "/student/sessions" component={Sessions}></Route>
        <Route exact path = "/student/classroom" component={StudentView}></Route>
        <Route exact path = "/student/becomeTutor" render={tutorRegistration}></Route>
        <Route exact path = "/student/setting" component={Settings}></Route>
      </Switch>
    </BrowserRouter>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))