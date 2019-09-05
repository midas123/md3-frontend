import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, ADD_TO_CART, CLEAR_CART } from './actionTypes';

const initialState = {
  products: [],
  productIds: [],
  productQuantity: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART: {
      return {
        ...state,
        products: action.payload
      };
    }
    case ADD_PRODUCT:{
      return {
        ...state,
        productToAdd: action.payload
        };
      }
    case REMOVE_PRODUCT:{
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload)
      };
    }
    case CLEAR_CART:{
      return {
        state : {}
      };
    }
    case ADD_TO_CART:{
      var array1 = action.payload;
      var array2 = state.products;
      
      const productList = array1.map(p => {
        if(state.productIds.includes(String(p.gd_id))){
          let idx;
          let dup = array2.find((e,index)=>{
            idx = index;
            return e.gd_id == p.gd_id;
          })
          return {
            ...p,
            item_quantity:p.item_quantity + array2[idx].item_quantity
          }
          
        } 

        return p;
      })
      const ids = action.payload.map(i =>{
          if(!state.productIds.includes(i.gd_id)){
            return String(i.gd_id);
          }
      })
        
      return {
        ...state,
        products: [...productList],
        productIds: [...state.productIds,...ids]
        };
      }
    default:
      return state;
  }
}
