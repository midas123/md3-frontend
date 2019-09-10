import { FETCH_ORDERS, READY_ORDER } from './actionType';


export const readyOrder = order =>{
    console.log("readyOrder: "+JSON.stringify(order))
    return{
        type: READY_ORDER,
        payload: order
    }
}


export const fetchOrder = (orders, total_price) => {
    return  (dispatch) => { 
        console.log("##order: "+JSON.stringify(orders))
        fetch("/api-product/goods/order", {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        body: JSON.stringify(orders)
      })
      .then(response => response.json())
      .then(json => {
            console.log("orderResult: "+json.message)
            if(json.success){
                let readyOrder = orders.map(o=>{
                    console.log("o: "+o)
                    return {
                        ...o,
                        "ordercode":json.ordercode
                    }
                })
                payOrder(readyOrder[0], dispatch, total_price);
            }
            // order.order_result = json.success;
            // dispatch({
            //     type: FETCH_ORDERS,
            //     payload: order
            // })
    })
    }
}

const payOrder = (order, dispatch, total_price) => {
    console.log("payOrder: "+payOrder)
    if(!order.success){
        alert("주문실패: 잠시후 다시 시도해주세요.")
    }
    console.log("pay: "+order.ordercode);

    const IMP = window.IMP; // 생략해도 괜찮습니다.
    IMP.init("imp08080720"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.

    IMP.request_pay({ // param
        pg: "inicis",
        pay_method: order.payment,
        merchant_uid: order.ordercode,
        name: order.item_name,
        amount: total_price,
        // buyer_email: "gildong@gmail.com",
        // buyer_name: "홍길동",
        buyer_tel: order.mobilephone_number,
        buyer_addr: order.address1,
        buyer_postcode: order.zip_code
    }, rsp => { // callback
        if (rsp.success) {
            // 결제 성공 시 로직,
            dispatch({
                type: FETCH_ORDERS,
                payload: order
            })
        } else {
            // 결제 실패 시 로직,
            alert("결제실패: 잠시후 다시 시도해주세요.")
        }
    });
}



// export const fetchUserInfo = user => {
//     return (dispatch) => {
//         fetch('/api-product/goods/order')
//         .then(response => {

//             console.log("order_result: "+response.status);
            
//             if(response.status === 200){
//                 order.isOrdered = true;
//             } else {
//                 order.isOrdered = false;
//             }
            
//             dispatch({
//                 type: FETCH_ORDERS,
//                 payload: order
//             })

//         })
//     }
// }






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
