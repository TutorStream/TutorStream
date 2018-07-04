import React, { Component } from 'react';
import axios from 'axios';

import { Carousel } from 'react-bootstrap';

class Review extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      index: 0,
      direction: null,
      reviews: [],
      tutor_id: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    // axios.get;
    this.setState(
      {
        tutor_id: id
      },
      () => {}
    );
  }

  handleSelect(selectedIndex, e) {
    alert(`selected=${selectedIndex}, direction=${e.direction}`);
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        {/* {this.state.reviews.map((review, i) => {
          return (
            <Carousel.Item>
              <h3>{}</h3>
              <p>{review}</p>
            </Carousel.Item>
          );
        })} */}
        <Carousel.Item>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Review;
