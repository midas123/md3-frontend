import { combineReducers } from 'redux';
import sortReducer from './sort/reducer';
import productsReducer from './products/reducer';
import cartReducer from './cart/reducer';
import totalReducer from './total/reducer';
import orderReducer from './order/reducer';
import authReducer from './auth/reducer';
import categoryReducer from './category/reducer';

const appReducer = combineReducers({
    sort: sortReducer,
    goods: productsReducer,
    cart : cartReducer,
    total : totalReducer,
    order : orderReducer,
    auth : authReducer,
    category : categoryReducer
  });

  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        console.log("USER_LOGOUT");
        state = undefined;
        localStorage.clear();
    }

    return appReducer(state, action)
  }

  export default rootReducer;