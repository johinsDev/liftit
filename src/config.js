import React from 'react';
console.log(process.env)
export default {
  maps: {
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: (<div style={{ height: `100%` }} />),
    containerElement: (<div style={{ height: `calc(100vh - 21.5rem)` }} />),
    mapElement: (<div style={{ height: `100%` }} />)
  }
}