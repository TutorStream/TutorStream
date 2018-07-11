import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, MenuItem, Button } from 'react-bootstrap';

class TestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tests: [],
      dropDownTitle: 'Tests'
    };
  }

  componentDidMount() {
    axios
      .get('/tests')
      .then(response => {
        this.setState({
          Tests: response.data
        });
      })
      .catch(err => {
        console.error('There was an error getting the list of tests: ', err);
      });
  }

  handleTestSelect = test => {
    this.setState(
      {
        dropDownTitle: test.Name
      },
      () => {
        this.props.setTestid(test.id);
      }
    );
  };

  render() {
    return (
      <div>
        <div>
          <DropdownButton
            bsStyle="default"
            title={this.state.dropDownTitle}
            key="0"
            id={`dropdown-basic-0`}
            onSelect={e => {
              this.handleTestSelect(e);
            }}
          >
            {this.state.Tests.map((test, i) => (
              <MenuItem eventKey={test} key={i}>
                {test.Name}
              </MenuItem>
            ))}
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default TestList;
