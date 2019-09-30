import { FETCH_ORDERS, READY_ORDER, CLEAR_ORDER, CLEAR_PREORDER }  from './actionType';

const initialState = {
    orders : [],
    preOrder :[]
}

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case READY_ORDER:
            return {
                ...state,
                preOrder: [...state.preOrder, ...action.payload]
            }    
        case CLEAR_PREORDER:
            return{
                ...state,
                preOrder: []
            }
        case CLEAR_ORDER:
                return{
                    preOrder: [],
                    order: []
                }
        default:
            return state;
    }
}