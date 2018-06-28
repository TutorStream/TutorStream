import React from 'react'
import ReactDOM from 'react-dom'
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
    render() {
        return (
        <BrowserRouter> 

            <Switch>
              <Route exact path = "/" render={(props) => {
                  return (<div>
                      <Login {...props}/>
                      <Signup {...props}/>
                  </div>);
              }}
              >
              </Route>
              <Route exact path = "/student" component={StudentView}></Route>
              <Route exact path = "/student/sessions" component={Sessions}></Route>
              <Route exact path = "/student/classroom" component={StudentView}></Route>
              <Route exact path = "/student/becomeTutor" component={TutorRegistration}></Route>
              <Route exact path = "/student/setting" component={Settings}></Route>

            </Switch>
        </BrowserRouter>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))