import { combineReducers } from 'redux';
import sortReducer from './sort/reducer';
import productsReducer from './products/reducer';
import paginationReducer from './pagination/reducer';


export default combineReducers({
    sort: sortReducer,
    goods: productsReducer
  });