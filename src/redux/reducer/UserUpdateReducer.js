import {USER_UPDATE,GET_USER_DATA} from '../action/types';

const INITIAL_STATE = {
  
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return action.payload;
    default:
      return state;
  }
};
