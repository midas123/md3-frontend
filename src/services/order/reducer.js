import { ADD_PRODUCT_ORDER , LOAD_ORDERS }  from './actionType';
import { QUANTITY_UP, QUANTITY_DOWN }  from './actionType';

const initialState = {
    orders : []
}

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_ORDERS:
            console.log("loadOrder: "+state.orders);
            return {
                ...state,
                orders: action.payload
            }
            
        case ADD_PRODUCT_ORDER:
            console.log("addorder-payload: "+action.payload);
            return Object.assign({}, state, {
                // ...state,
                // addOrder : action.payload
                orders: [
                    ...state.orders, action.payload
                ]
                
            });
        
        case QUANTITY_UP:
            const { payload } = action;
            console.log("QUANTITY_UP: "+ payload);
           const { item_quantity } = payload;

            let num = Number(item_quantity);
            console.log(num++ )
            return {
                ...state,
                item_quantity: num++
            };
            
        case QUANTITY_DOWN:
            let num2 = Number(item_quantity);
            if(num2<1)
                return ;
            return {
                ...state,
                item_quantity: num2--
        };

        default:
            return state;
    }
}