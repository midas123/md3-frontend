import { LOAD_CART, REMOVE_PRODUCT, ADD_TO_CART, CLEAR_CART } from './actionTypes';

const initialState = {
  products: [],
  productIds: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART: {
      return {
        ...state,
        products: action.payload
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
        products: [],
        productIds: []
      };
    }
    case ADD_TO_CART:{
      var newItem = action.payload;//새로 추가된 상품
      var current = state.products;//기존 장바구니 상품
      const newList = newItem.map(p => {
        if(state.productIds.includes(String(p.gd_id))){
          let idx;
          current.find((e,index)=>{ //중복 상품 인덱스 구해서 수량 더하기
            idx = index;
            return e.gd_id == p.gd_id;
          })
          let iq = current[idx].item_quantity;
          current.splice(idx, 1);
          return {
            ...p,
            item_quantity: p.item_quantity + iq
          }
        } 

        return p;
      })
      const productList = current.concat(newList);
      const ids = action.payload.map(i =>{ //새로 추가된 상품을 상품id 리스트에 추가
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
