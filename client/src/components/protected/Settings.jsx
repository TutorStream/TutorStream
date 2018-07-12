import React, { Component } from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox,
  Button
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Settings extends Component {
  state = {
    tests: [],
    test: '',
    name: '',
    bio: '',
    tutorBio: '',
    submitted: false,
    selectedTests: [],
    price: '',
    isTutor: false,
    preSelected: [],
    photo: '',
    selectedFile: null
  };

  componentDidMount() {
    const { id } = this.props;
    let info;
    axios
      .get(`/users/info/${id}`)
      .then(({ data }) => {
        info = data[0];
        this.setState({
          id: info.id,
          name: info.Name,
          bio: info.Bio
        });
      })
      .then(() => {
        this.getAllTests();
        if (info.Tutor === 1) {
          this.setState({
            isTutor: true
          });
          axios.get(`/tutors/${id}`).then(({ data }) => {
            info = data;
            var preselected = [];
            info.tests.forEach(test => {
              preselected.push(test.id);
            });
            this.setState({
              tutorBio: info.Bio,
              price: info.Price,
              selectedTests: preselected
            });
          });
        }
      })
      .then(() => {
        return axios.get('/users/photo', {
          params: {
            user_id: this.props.id
          }
        });
      })
      .then(({ data }) => {
        console.log('what is the data coming through?', data);
        this.setState({
          photo: data[0].location
        });
      })
      .catch(err => {
        console.error("There was an error getting the user's settings: ", err);
      });
  }

  getAllTests = () => {
    axios
      .get('/tests')
      .then(({ data }) => {
        this.setState({
          tests: data
        });
      })
      .catch(err => {
        console.error('There was an error getting all the tests: ', err);
      });
  };

  handleCheck = e => {
    var array = this.state.selectedTests.slice();
    if (array.indexOf(Number(e.target.value)) === -1) {
      this.setState(
        {
          selectedTests: [...this.state.selectedTests, e.target.value]
        },
        () => console.log(this.state.selectedTests)
      );
    } else {
      var idx = array.indexOf(Number(e.target.value));
      console.log('idx', idx);
      array.splice(idx, 1);
      this.setState(
        {
          selectedTests: array
        },
        () => console.log(this.state.selectedTests)
      );
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isPreselectedTests = id => {
    if (this.state.selectedTests.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    var testsArray = [];
    this.state.selectedTests.forEach(test_id => {
      testsArray.push({
        tutor_id: this.props.id,
        test_id
      });
    });

    var form = {
      tests: testsArray,
      tutorBio: this.state.tutorBio,
      rate: Number(this.state.price),
      id: this.props.id,
      userBio: this.state.bio,
      name: this.state.name,
      isTutor: this.state.isTutor
    };

    axios
      .post(`/users/${this.props.id}`, form)
      .then(() => {
        this.handleFileUpload(this.props.id);
      })
      .then(() => {
        this.setState({
          selectedFile: null,
          submitted: true
        });
      })
      .catch(err => console.error(err));
  };

  handleFileSelect = e => {
    this.setState({
      selectedFile: e.target.files
    });
  };

  handleFileUpload = user_id => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile[0]);
    axios
      .post(
        'http://ec2-34-207-66-224.compute-1.amazonaws.com:5000/photo-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            crossDomain: true
          }
        }
      )
      .then(({ data }) => {
        let userPhoto = {
          user_id,
          location: data.Location
        };
        axios.post('/users/photo', userPhoto);
      })
      .catch(error =>
        console.error(
          'There was an error with the POST request to the server: ',
          error
        )
      );
  };

  render() {
    let conditionalDisplay = !this.state.isTutor ? (
      <div />
    ) : (
      <div>
        <h2>Tutor settings </h2>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Tutor Bio</ControlLabel>
          <FormControl
            maxLength="255"
            componentClass="textarea"
            placeholder="Enter text (Max: 255 characters)"
            name="tutorBio"
            value={this.state.tutorBio}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Rate: (hourly)</ControlLabel>
          <FormControl
            type="number"
            placeholder={this.state.price}
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          {this.state.tests.map((test, i) => {
            return (
              <Checkbox
                onChange={this.handleCheck}
                inline
                key={i}
                value={Number(test.id)}
                checked={
                  this.isPreselectedTests(test.id) ? 'checked' : undefined
                }
              >
                {test.Name}
              </Checkbox>
            );
          })}
        </FormGroup>
      </div>
    );

    if (this.state.submitted) {
      return <Redirect to="/findTutor" />;
    }

    return (
      <div className="settings">
        <h1>Settings</h1>
        <br />
        <div className="image-settings">
          <img
            className="img-circle"
            src={this.state.photo}
            alt={`${this.state.name}'s profile picture`}
          />
        </div>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            maxLength="255"
            componentClass="textarea"
            placeholder="Enter text (Max: 255 characters)"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Bio</ControlLabel>
          <FormControl
            maxLength="255"
            componentClass="textarea"
            placeholder="Enter text (Max: 255 characters)"
            name="bio"
            value={this.state.bio}
            onChange={this.handleChange}
          />
        </FormGroup>

        <br />
        <FormGroup controlId="formControlsFile" encType="multipart/form-data">
          <ControlLabel>Update your profile picture :</ControlLabel>
          <FormControl
            type="file"
            name="photo"
            onChange={this.handleFileSelect}
          />
        </FormGroup>

        <h1>_____________</h1>

        {conditionalDisplay}
        <br />
        <Button bsStyle="success" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </div>
    );
  }
}

export default Settings;
