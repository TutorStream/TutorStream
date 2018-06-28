import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, MenuItem, Button } from 'react-bootstrap';

class TestList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      Tests : [],
    }
    this.handleTestSelect = this.handleTestSelect.bind(this);
  }

  componentDidMount() {
    axios.get('/tests')
      .then((response) => {
        console.log('what is the response from querying db for tests: ', response);
        this.setState({
          Tests : response.data
        });
      })
      .catch((err) => {
        console.error('There was an error getting the list of tests: ', err);
      });
  }

  handleTestSelect(e) {
    console.log('e.target.eventKey', e);
    console.log('this .props', this.props)
    this.props.setTestID(e);
  }

  render() {
    console.log(this.state.Tests, 'this.state.TEsts');
    return (
      <div>
        <div>
        <DropdownButton 
          bsStyle='default'
          title='Tests'
          key='0'
          id={`dropdown-basic-0`}
          onSelect={(e) => {this.handleTestSelect(e)}}>
          { this.state.Tests.map((test, i) => <MenuItem eventKey={test.ID} key={i}>{test.Name}</MenuItem>) }
        </DropdownButton>
        </div>
      </div>
    )
  }
}


export default TestList;