import { ADD_PRODUCT_ORDER, LOAD_ORDERS } from './actionType';
import { QUANTITY_UP, QUANTITY_DOWN } from './actionType';


// export const loadOrders = (orders) => {
//     return(dispatch) => {
//         console.log("Orders: "+JSON.stringify(orders));
//         dispatch({
//             type: LOAD_ORDERS,
//             payload: orders
//         })    
//     }
// }

export const loadOrders = orders => ({
    type: LOAD_ORDERS,
    payload: orders
});


export const addOrder = (order) => {

    return(dispatch) => {
        console.log("addOrder: "+JSON.stringify(order));
        dispatch({
            type: ADD_PRODUCT_ORDER,
            payload : order
        }) 

    }
}

export const quantityUp = (order) => {
    return(dispatch) =>{
        dispatch({
            type: QUANTITY_UP,
            payload : order 
        })
    }
}

export const quantityDown = (order) => {
    return(dispatch) =>{
        dispatch({
            type: QUANTITY_DOWN,
            payload : order
        })
    }
}