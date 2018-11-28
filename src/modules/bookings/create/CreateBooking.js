import React, { Component } from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import Grid from '@material-ui/core/Grid';
import { withFormik } from 'formik';
import { compose } from 'redux';
import classNames from 'classnames/bind';
import styles from './CreateBooking.scss';
import MapWithMarkers from './components/MapWithMarkers/MapWithMarkers';
import Distance from './components/Distance/Distance';
import * as Yup from 'yup';
import Layout from '../../../common/Layout';
import { withRouter } from 'react-router-dom';
import { createBooking } from '../data/booking.actions';
import { connect } from 'react-redux'

const cx = classNames.bind(styles);

class CreateBooking extends Component {
  render() {
    const {
      originLatitude,
      originLongitude,
      destinationLatitude,
      destinationLongitude
    } =  this.props.values;

    return (
      <Layout>
        <Grid container className={cx('container')}>
          <Grid item xs={12} className={cx('item')}>
            <SearchBox />
          </Grid>
          <Grid item xs={12}>
            <MapWithMarkers
              origin={{
                lat: originLatitude,
                lng: originLongitude
              }}
              destination={{
                lat: destinationLatitude,
                lng: destinationLongitude
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Distance
              isValid={this.props.isValid}
              isSubmitting={this.props.isSubmitting}
              submit={this.props.handleSubmit}
            />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

const addressSchema = Yup.object().shape({
  origin: Yup.string()
    .required('Required'),
  destination: Yup.string()
    .required('Required')
});

const mapDispatchToProps = (dispatch) => {
  return {
    create: (data) => dispatch(createBooking(data))
  }
}

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  ),
  withFormik({
    mapPropsToValues: () => ({ 
      origin: '', 
      originLatitude: '', 
      originLongitude: '',
      destination: '', 
      destinationLatitude: '', 
      destinationLongitude: '' 
    }),
    validationSchema: addressSchema,
    handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
      try {
        const response = await props.create({
          origin: values.origin,
          destination: values.destination
        });

        if (response.value.data) {
          props.history.push('bookings')
        }

        resetForm();
      } catch (error) {
        console.log(error)
      }

      setSubmitting(false)
    }
  })
)(CreateBooking);