import { FETCH_ORDERS, READY_ORDER } from './actionType';


export const readyOrder = order =>{
    console.log("readyOrder: "+JSON.stringify(order))
    return{
        type: READY_ORDER,
        payload: order
    }
}


export const fetchOrder = order => {
    return (dispatch) => {
        fetch('/api-product/goods/order')
        .then(response => {

            console.log("order_result: "+response.status);
            
            if(response.status === 200){
                order.isOrdered = true;
            } else {
                order.isOrdered = false;
            }
            
            dispatch({
                type: FETCH_ORDERS,
                payload: order
            })

        })
    }
}






// export const loadOrders = orders => ({
//     type: LOAD_ORDERS,
//     payload: orders
// });


// export const addOrder = (order) => {

//     return(dispatch) => {
//         console.log("addOrder: "+JSON.stringify(order));
//         dispatch({
//             type: ADD_PRODUCT_ORDER,
//             payload : order
//         }) 

//     }
// }
