import {GET_SEARCH} from '../action/types';

const INITIAL_STATE = {
  
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SEARCH:
      return action.payload;
    
    default:
      return state;
  }
};
