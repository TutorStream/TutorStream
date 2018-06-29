import React, {Component} from 'react'


class Sessions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessions: []
    }
    this.getUpcomingSessions = this.getUpcomingSessions.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
  }
  
  componentDidMount(){
      this.getUpcomingSessions()
  }

  getUpcomingSessions() {
    // id will come from state or this.props.match.params
    console.log(`Axios request to get upcoming sessions`)
    // const {id} = this.props.match.params
    // axios.get(`/sessions/${id}`)
    // .then((resp) => {
    //     this.setState({
    //         sessions: resp.data
    //     })
    // })
  }

  deleteSession(id){
    axios.delete(`/sessions/${id}`)
    .then(() => {
        this.getUpcomingSessions()
    })
  }

  render() {
    // import Link from react-router-dom and wrap around info.date or whatever we decide to put in there
    // also wrap whatever we put in there with a button that also has access to the id of the session 
    // put onClick => this.deleteSession
    return (
        <div>
            <h1>Session Component!</h1> 
            <ul>
            {/* {this.state.sessions.map((info, index) => {
                return (<li key={index} >{info.date}</li>)
            })} */}
            </ul>
        </div>
    )
  }
}

export default Sessions 