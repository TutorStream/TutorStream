import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import StudentView from './components/student/StudentView.jsx'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id : null,
      tests: []
    }
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getID (id) {
    this.setState({
      id : id
    })
  }

  getAllTests () {
    axios.get('/tests', {
      params : {
        user_id : this.state.id
      }
    })
    .then(({data}) => {
      this.setState({
        tests : data
      })
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
      return <StudentView ID={this.state.ID} tests={this.state.tests} />
    }
    
    return (
    <BrowserRouter> 
      <Switch location={location}>
        <Route exact path = "/" render={(props) => {
            return (<div>
                <Login className='login' {...props} ID={this.state.ID} getID={this.getID}/>
                <Signup {...props} tests={this.state.tests}/>
            </div>);
        }}>
        </Route>
        <Route exact path = "/logout" render={(props) => {
            return (<div>
                <Login {...props} ID={this.state.ID} getID={this.getID}/>
                <Signup {...props} tests={this.state.tests}/>
            </div>);
        }}>
        </Route>
        <Route exact path = "/student" render={studentView}></Route>
      </Switch>
    </BrowserRouter>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))
export default App;