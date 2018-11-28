import React, { Component } from 'react';
import { compose } from 'redux';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withProps } from 'recompose';
import config from '../../config';
import _ from 'lodash';

class Map extends Component {
  componentDidUpdate(prevProps) {
    const newOrigin = this.props.markers[0];
    const newDestination = this.props.markers[1];

    const origin = prevProps.markers[0];
    const destination = prevProps.markers[1];

    if (!_.isEqual(origin, newOrigin) || !_.isEqual(newDestination, destination)) {
      this._fitTheBounds();
    }
  }

  _fitTheBounds = () => {
    const { LatLng, LatLngBounds } = google.maps; // eslint-disable-line

    const bounds = new LatLngBounds();
    const { markers } = this.props;
    let newBounds = [];
    
    markers.map((m) => {
      newBounds.push(new LatLng(Number(m.lat), Number(m.lng)))
    })

    newBounds.forEach(bound => bounds.extend(bound));

    this.map.fitBounds(bounds);
  }

  render() {
    return (
      <>
        <GoogleMap
          ref={map => this.map = map}
          defaultZoom={8}
          defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)} // eslint-disable-line
        >
          {this.props.children}
        </GoogleMap>
        {/* <button type="button" onClick={this._fitTheBounds}>
            Fit Bounds Manually
          </button> */}
      </>
    )
  }
}

export default compose(
  withProps({
    ...config.maps
  }),
  withScriptjs,
  withGoogleMap
)(Map);