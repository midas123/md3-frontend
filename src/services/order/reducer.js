import { FETCH_ORDERS, READY_ORDER, CLEAR_ORDER }  from './actionType';

const initialState = {
    orders : [],
    preOrder :[]
}

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_ORDERS:
            console.log("FETCH_ORDERS: "+JSON.stringify(action.payload));
            return {
                ...state,
                // orders: [...state.orders, ...action.payload]
                orders: action.payload
            }
        case READY_ORDER:
            return {
                ...state,
                preOrder: [...state.preOrder, ...action.payload]
            }    
        case CLEAR_ORDER:
            console.log("CLEAR_ORDER")
            return{
                order: [],
                preOrder: []
            }
        default:
            return state;
    }
}