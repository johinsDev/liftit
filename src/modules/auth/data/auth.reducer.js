import types from './auth.types';

const initialState = {
  user: {},
  error: false
}

export default function bookings(state = initialState, { type, payload }) {
  switch (type) {
    case `${ types.SIGN_IN }`:
    case `${ types.SIGN_UP }`:
      return {
        ...state,
        ...initialState
      }
    case `${ types.SIGN_IN }_FULFILLED`:
    case `${ types.SIGN_UP }_FULFILLED`:
    case `${ types.ME }_FULFILLED`:
      return {
        ...state,
        user: payload.data
      }
    case `${ types.SIGN_IN }_REJECTED`:
    case `${ types.SIGN_UP }_REJECTED`:
    return {
      ...state,
      error: true
    }
    default:
      return state;
  }
}   