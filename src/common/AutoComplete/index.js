import React, { Component } from 'react';
import { withScriptjs } from "react-google-maps";
import { withProps } from 'recompose';
import { compose } from 'redux';
import config from '../../config';
import SearchBar from '../SearchBar';
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

class AutoComplete extends Component {
  static searchBox = null;

  state = {
    places: []
  }

  onPlacesChanged = () => {
    const places = this.searchBox.getPlaces();
    
    const {
      form: { setValues, values },
      field:{ name }
    } = this.props;

    const address = places[0];

    setValues({
      ...values,
      [name]: address.name,
      [`${name}Latitude`]: address.geometry.location.lat(),
      [`${name}Longitude`]: address.geometry.location.lng()
    });
  }

  onSearchBoxMounted = (ref) => {
    this.searchBox = ref;
  }

  render() {
    const { placeholder, field: { value, name }, form: { setValues, values } } = this.props;

    return (
      <div data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.props.bounds}
          onPlacesChanged={this.onPlacesChanged}
        >
          <SearchBar
            placeholder={placeholder}
            onCancelSearch={() => {
              setValues({
                ...values,
                [name]: '',
                [`${name}Latitude`]: '',
                [`${name}Longitude`]: ''
              });
            }}
            value={value}
          />
        </StandaloneSearchBox>
      </div>
    );
  }
}

export default compose(
  withProps({
    ...config.maps
  }),
  withScriptjs
)(AutoComplete);

