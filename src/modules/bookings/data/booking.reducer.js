import types from './booking.types';

const initialState = {
  bookings: [],
  metadata: {}
}

export default function bookings(state = initialState, { type, payload }) {
  switch (type) {
    case `${ types.CREATE_BOOKING }_FULFILLED`:
      return {
        ...state,
        bookings: [...state.bookings, {...payload.data}]
      }
    case `${ types.GET_BOOKINGS }_FULFILLED`:
      return {
        ...state,
        bookings: payload.data
      }
    case types.ADD_METADATA_BOOKING:
      return {
        ...state,
        metadata: payload
      }
    default:
      return state;
  }
}   