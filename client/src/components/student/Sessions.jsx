import React, {Component} from 'react'


class Sessions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: []
        }
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
    render() {
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