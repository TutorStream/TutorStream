import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import TutorProfile from './TutorProfile.jsx'

class Classroom extends Component {
    render() {
        return (
            <div>
            <h1>Classroom</h1>

            <form action="https://appear.in/hufflepuffhackreactor">
            <Button type="submit" value="Go to Class" >Go to Class</Button>
            </form>
        
            </div>
        )
    }
}

export default Classroom
