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
      ID : null,
      Tests: []
    }
    this.getID = this.getID.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getID (ID) {
    
    this.setState({
      ID : ID
    })
  }

  getAllTests () {
    axios.get('/tests', {
      params : {
        user_id : this.state.ID
      }
    })
    .then(({data}) => {
      this.setState({
        Tests : data
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
      return <StudentView ID={this.state.ID} Tests={this.state.Tests} />
    }
    
    return (
    <BrowserRouter> 
      <Switch location={location}>
        <Route exact path = "/" render={(props) => {
            return (<div>
                <Login className='login' {...props} ID={this.state.ID} getID={this.getID}/>
                <Signup {...props} Tests={this.state.Tests}/>
            </div>);
        }}
        >
        </Route>
        <Route exact path = "/student" render={studentView}></Route>
      </Switch>
    </BrowserRouter>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))