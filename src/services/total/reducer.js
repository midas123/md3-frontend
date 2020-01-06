import { UPDATE_CART } from './actionTypes';

const initialState = {
  data: {
    totalQuantity: 0,
    // installments: 0,
    // totalPrice: 0,
    // currencyId: '원',
    currencyFormat: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      console.log("UPDATE_CART: "+JSON.stringify(action))
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
