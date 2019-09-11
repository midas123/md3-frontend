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
        state : {}
      };
    }
    case ADD_TO_CART:{
      var array1 = action.payload;//새로 추가된 상품
      var array2 = state.products;//기존 장바구니 상품
      
      const productList = array1.map(p => {
        if(state.productIds.includes(String(p.gd_id))){
          let idx;
          array2.find((e,index)=>{ //중복 상품 인덱스 구해서 수량 더하기
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
      const ids = action.payload.map(i =>{ //새로 추가된 상품을 상품id 리스트에 추가
          if(!state.productIds.includes(i.gd_id)){
            return String(i.gd_id);
          }
      })
        
      return {
        ...state,
        products: [...state.products,...productList],
        productIds: [...state.productIds,...ids]
        };
      }
    default:
      return state;
  }
}
