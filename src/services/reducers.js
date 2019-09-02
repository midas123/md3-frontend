import { combineReducers } from 'redux';
import sortReducer from './sort/reducer';
import productsReducer from './products/reducer';
import cartReducer from './cart/reducer'
import totalReducer from './total/reducer';
import orderReducer from './order/reducer';

export default combineReducers({
    sort: sortReducer,
    goods: productsReducer,
    cart : cartReducer,
    total : totalReducer,
    order : orderReducer
  });