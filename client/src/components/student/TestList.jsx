import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, MenuItem, Button } from 'react-bootstrap';

class TestList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tests: [{name: 'LSAT', id: 1}, {name: 'MCAT', id: 2}, {name: 'HR TA', id: 3}, {name: 'GRE', id: 4}, {name: 'GMAT', id: 5}]
    };
  }

  componentDidMount() {
    axios.get('/tests')
      .then((response) => {
        console.log('what is the response from querying db for tests: ', response);
        this.setState({
          tests: response.data
        });
      })
      .catch((err) => {
        console.error('There was an error getting the list of tests: ', err);
      });
  }

  // handleTestSelect(e) {
  //   axios.get(`/tests/${e}`)
  //     .then((response) => {

  //     })
  //     .catch((err) => {
  //       console.error('There was an error with getting the selected test info: ', err);
  //     });
  // }

  render() {
    return (
      <div>
        <div>
        <DropdownButton 
          bsStyle='default'
          title='Tests'
          key='0'
          id={`dropdown-basic-0`}>
          { this.state.tests.map((test) => <MenuItem eventKey={test.id} key={test.id} onSelect={(e) => this.handleTestSelect(e)}>{test.name}</MenuItem>) }
        </DropdownButton>
        </div>
      </div>
    )
  }
}


export default TestList;