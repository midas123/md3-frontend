import { UPDATE_CART } from './actionTypes';

export const updateCart = cartProducts => dispatch => {
  console.log("updateCart: "+JSON.stringify(cartProducts));
  let totalQuantity = cartProducts.reduce((sum, p) => {
    sum += p.item_quantity;
    return sum;
  }, 0);

  let totalPrice = cartProducts.reduce((sum, p) => {
    sum += p.item_price * p.item_quantity;
    return sum;
  }, 0);

  // let installments = cartProducts.reduce((greater, p) => {
  //   greater = p.installments > greater ? p.installments : greater;
  //   return greater;
  // }, 0);

  let cartTotal = {
    totalQuantity,
    //installments,
    totalPrice,
    currencyId: '원',
    currencyFormat: ''
  };

  dispatch({
    type: UPDATE_CART,
    payload: cartTotal
  });
};
