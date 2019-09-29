import { FETCH_ORDERS, READY_ORDER, CLEAR_ORDER } from './actionType';
import { API_BASE_URL } from '../../services/util/constant';


export const readyOrder = order =>{
    return{
        type: READY_ORDER,
        payload: order
    }
}

export const clearOrder = () =>{
    return{
        type: CLEAR_ORDER
    }
}


export const fetchOrder = (orders, total_price, callback) => {
    return  (dispatch) => { 
        let token = localStorage.getItem("accessToken")
        fetch(API_BASE_URL+"/api-order/goods/order", {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        }),
        method: 'post',
        body: JSON.stringify(orders)
      })
      .then(response => response.json())
      .then(json => {
            if(json.success){
                let readyOrder = orders.map(o=>{
                    return {
                        ...o,
                        "ordercode":json.ordercode,
                        "payment_info":{
                            ...o.payment_info,
                            "total_price":total_price
                        }
                    }
                })
                payOrder(readyOrder, dispatch, total_price, callback);

             
            }
    })
    }
}

const payOrder = (order, dispatch, total_price, callback) => {
    if(order[0].ordercode == null){
        alert("주문실패: 잠시후 다시 시도해주세요.")
        return;
    }

    if(order[0].payment_info.payment == "계좌이체"){
        dispatch({
            type: FETCH_ORDERS,
            payload: order
        })
    }

    if(order[0].payment_info.payment == "card"){ 
        const IMP = window.IMP; // 생략해도 괜찮습니다.
        IMP.init("imp08080720"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.

        IMP.request_pay({ // param
            pg: "inicis",
            pay_method: order[0].payment,
            merchant_uid: order[0].ordercode,
            name: order[0].item_name,
            amount: total_price,
            // buyer_email: "gildong@gmail.com",
            // buyer_name: "홍길동",
            buyer_tel: order[0].mobilephone_number,
            buyer_addr: order[0].address1,
            buyer_postcode: order[0].zip_code
        }, rsp => { // callback
            if (rsp.success) {
                // 결제 성공 시 로직,
                dispatch({
                    type: FETCH_ORDERS,
                    payload: order
                })
                if (!!callback) {
                    callback();
                }
            } else {
                // 결제 실패 시 로직,
                alert("결제실패: 잠시후 다시 시도해주세요.")
            }
        });
    }
}

