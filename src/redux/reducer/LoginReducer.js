import {LOGIN_USER_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL} from '../action/types';

const INITIAL_STATE = {
  loading: false,
  currentUser:"",
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loading: true};
    case LOGIN_USER_SUCCESS:
      return {...state,loading: false}
    case LOGIN_USER_FAIL:
      return {...state,loading: false};

    default:
      return state;
  }
};
