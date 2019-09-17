import { FETCH_ORDERS, READY_ORDER, CLEAR_ORDER }  from './actionType';

const initialState = {
    // orders : [],
    orders : [{"gd_id":"300","item_name":"원목 라운디시 벤치 110","item_quantity":1,"item_option1":"기본","item_option2":"","item_thumbnail":"Thumbnail_280.jpg","item_price":69300,"delivery_info":{"recipient_name":"홍길동길","mobilephone_number":"010-1111-1111","email_address":"email@email.com","zip_code":"06000","address1":"서울 강남구 강남대로 708","address2":" (압구정동, 한남대교레인보우카폐)","delivery_memo":"","orderer_name":"홍길동길"},"payment_info":{"payment":"계좌이체","total_price":69300},"ordercode":"S20190917BTMTR"}],
    // preOrder :[]
    preOrder :[{"gd_id":"300","item_name":"원목 라운디시 벤치 110","item_quantity":1,"item_option1":"기본","item_option2":"","item_thumbnail":"Thumbnail_280.jpg","item_price":69300}]
}

export default function orderReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_ORDERS:
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
            return{
                order: [],
                preOrder: []
            }
        default:
            return state;
    }
}