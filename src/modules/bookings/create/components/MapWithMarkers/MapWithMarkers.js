import React from 'react';
import { connect } from 'react-redux'; 
import { OverlayView } from "react-google-maps";
import Map from '../../../../../common/Map';
import CustomMarker from '../../../../../common/Marker';
import Direction from '../../../../../common/Direction';
import { Paper } from '@material-ui/core';
import { addMetadaBooking } from '../../../data/booking.actions'
const getPixelPositionOffset = (width, height) => ({
  x: - width + 15,
  y: - height + 8,
})

const MapWithMarkers = ({ origin, destination, addMetaToBooking }) => {
  return (
    <Paper>
      <Map markers={[
        origin,
        destination
      ]}>
        {origin.lat && origin.lng && <OverlayView
          position={{ lat: origin.lat, lng: origin.lng  }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <CustomMarker />
        </OverlayView>}
        {destination.lat && destination.lng && <OverlayView
          position={{ lat: destination.lat, lng: destination.lng  }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <CustomMarker />
        </OverlayView>}
        {
        origin.lat && destination.lat && 
          <Direction
            origin={origin}
            onChangeDirection={addMetaToBooking}
            destination={destination}
          />
        }
      </Map>
    </Paper>
  );
};

function mapDispatchToProps(dispatch) {
  return ({
    addMetaToBooking: (metadata) => dispatch(addMetadaBooking(metadata))
  })
}

export default connect(null, mapDispatchToProps)(MapWithMarkers);