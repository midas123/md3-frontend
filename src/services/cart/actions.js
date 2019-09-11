import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, ADD_TO_CART, CLEAR_CART } from './actionTypes';

export const loadCart = products => {
  return{
    type: LOAD_CART,
  payload: products
}};

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});


export const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product
});

export const clearCart = () => ({
  type: CLEAR_CART
});

