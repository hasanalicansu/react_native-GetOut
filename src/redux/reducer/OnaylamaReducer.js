import {GET_ONAYLAMA_DATA} from '../action/types';

const INITIAL_STATE = {
  
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ONAYLAMA_DATA:
      return action.payload;
    default:
      return state;
  }
};

