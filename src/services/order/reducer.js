import { FETCH_ORDERS, READY_ORDER }  from './actionType';

const initialState = {
    orders : [],
    preOrder :[]
}

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_ORDERS:
            console.log("FETCH_ORDERS: "+action.payload);
            return {
                ...state,
                orders: [...state.orders, ...action.payload]
            }
        case READY_ORDER:
            console.log("READY_ORDER: "+JSON.stringify(action.payload));
            return {
                ...state,
                preOrder: [...state.preOrder, ...action.payload]
            }    
     
        default:
            return state;
    }
}