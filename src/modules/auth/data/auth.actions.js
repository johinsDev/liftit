import types from './auth.types';
import { post, get } from '../../../utils/request';

export function signIn(data) {
  return function $signIn(dispatch) {
    return dispatch({
      type: types.SIGN_IN,
      payload: {
        promise: post('/auth/signin', data).then((response) => {
          // toast.success('Issue updated', {
          //   position: toast.POSITION.TOP_RIGHT
          // });
  
          return response;
        }),
        data
      }
    })
  }
}

export function signUp(data) {
  return function $signUp(dispatch) {
    return dispatch({
      type: types.SIGN_UP,
      payload: {
        promise: post('/auth/signup', data).then((response) => {
          // toast.success('Issue updated', {
          //   position: toast.POSITION.TOP_RIGHT
          // });
  
          return response;
        }),
        data
      }
    })
  }
}
export function me(data) {
  return function $me(dispatch) {
    return dispatch({
      type: types.ME,
      payload: {
        promise: get('/auth/me', data).then((response) => {
          return response;
        }),
        data
      }
    })
  }
}
