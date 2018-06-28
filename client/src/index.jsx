import React from 'react'
import ReactDOM from 'react-dom'
import StudentView from './components/student/StudentView.jsx'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
// import Sessions from './components/student/Sessions.jsx'
// import Classroom from './components/communication/Classroom.jsx'
// import TutorRegistration from './components/student/TutorRegistration.jsx'
// import Settings from './components/Settings.jsx'

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
              }}>
              </Route>
              <Route exact path = "/student" component={StudentView}></Route>
            </Switch>
        </BrowserRouter>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'))