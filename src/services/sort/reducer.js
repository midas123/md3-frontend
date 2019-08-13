import { UPDATE_SORT } from './actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  type: ''
};

function sortReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SORT:
        return {
          ...state,
          type: action.payload
        };
   

    default:
      return state;
  }
}



 export default combineReducers({
   sort: sortReducer
 });