import types from './booking.types';
import { post, get } from '../../../utils/request';

export function addMetadaBooking(metadata) {
  return function $addMetadaBooking(dispatch) {
    dispatch({
      type: types.ADD_METADATA_BOOKING,
      payload: {
        ...metadata
      }
    })
  }
}

export function createBooking(data) {
  return function $createBooking(dispatch) {
    return dispatch({
      type: types.CREATE_BOOKING,
      payload: {
        promise: post('/bookings', data).then((response) => {
          return response;
        }),
        data
      }
    })
  }
}

export function getBookings() {
  return function $getBookings(dispatch) {
    return dispatch({
      type: types.GET_BOOKINGS,
      payload: {
        promise: get('/bookings').then((response) => {
          return response;
        })
      }
    })
  }
}