import { combineReducers } from 'redux';
import { filterReducer } from 'material-ui-filter'
import bookings from './modules/bookings/data/booking.reducer';
import auth from './modules/auth/data/auth.reducer';

export default combineReducers({
  auth,
  bookings,
  filters: filterReducer
});