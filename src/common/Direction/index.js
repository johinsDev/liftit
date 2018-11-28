import React, { Component } from 'react';
import DirectionsRenderer from 'react-google-maps/lib/components/DirectionsRenderer';
import _ from 'lodash';

class Direction extends Component {
  state = {
    directions: {}
  }

  componentDidUpdate(prevProps) {
    const newOrigin = this.props.origin;
    const newDestination = this.props.destination;

    const origin = prevProps.origin;
    const destination = prevProps.destination;

    if (!_.isEqual(origin, newOrigin) || !_.isEqual(newDestination, destination)) {
      this._printDirection();
    }
  }

  componentDidMount() {
    this._printDirection();
  }

  _printDirection = () => {
    const { origin, destination, onChangeDirection } = this.props;
    const DirectionsService = new google.maps.DirectionsService(); // eslint-disable-line
    DirectionsService.route({
      origin: new google.maps.LatLng(origin.lat, origin.lng), // eslint-disable-line
      destination: new google.maps.LatLng(destination.lat, destination.lng), // eslint-disable-line
      travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) { // eslint-disable-line
        this.setState({
          directions: result,
        });

        onChangeDirection(result.routes[0].legs[0]);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  // @TOO: styles map, add informtion travel(redux, thunk, reselect, promise)
  // add buttom create booking
  // add validations
  // create request util axios
  // add menu bar
  // create list services
  // display backend
  // add login and register
  // protect routes
  // seed bookings
  // list bookigns anf filter
  // deploy backend and deploy frontend

  render() {
    return (
      <DirectionsRenderer
        directions={this.state.directions}
        options={{ suppressMarkers: true }}
      />
    );
  }
}

export default Direction;