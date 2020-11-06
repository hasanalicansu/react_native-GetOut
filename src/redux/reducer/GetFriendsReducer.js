import {GET_FRIENDS} from '../action/types';

const INITIAL_STATE = {
  
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FRIENDS:
      
      return action.payload;
    default:
      return state;
  }
};

