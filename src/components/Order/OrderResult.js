import React from 'react';
import { connect } from 'react-redux';
import util from '../../services/util';
import ThumbNail from '../ThumbNail/ThumbNail';
import { Link  } from "react-router-dom";

import './OrderResult.scss';

function OrderResult(props){
    const { orderResult } = props;

    const itemList = orderResult.map(order=>{
        return(
        <div className="order-result-item" key={order.gd_id}>
            <ThumbNail
                classes="order-result-item__thumb"
                src={util.imagePath+order.item_thumbnail}
                alt={order.item_name}
                />
            <div className="order-result-item__name">
                <span>상품명:</span>
                {order.item_name}
            </div>
            <div className="order-result-item__option">
            <span>옵션:</span>
                
                {order.item_option1}{order.item_option2 && '/ '+ order.item_option2}
                
            </div>
            <div className="order-result-item__quantity">
            <span>수량:</span>
                {order.item_quantity}
            </div>
        </div>
        )
    })

    return(
        <div className="order-result">
            <div className="order-result__title">주문 결과</div>

            <div className="order-result__sub-title">주문 상품<span>주문번호: {orderResult[0].ordercode}</span></div>
            <div className="line"><hr></hr></div>
            <div className="order-result__item-info">
                <div className="order-result__item-list">
                    {itemList}
                </div>
            </div>
            <div className="order-result__delivery-info">
                <div className="order-result__sub-title">배송 정보</div>
                <div className="line"><hr></hr></div>
                <div className="order-result__delivery-contents">
                    <div className="delivery-result-info">
                        <p><span>수령인</span>{orderResult[0].delivery_info.recipient_name}</p>
                        <p><span>연락처</span>{orderResult[0].delivery_info.mobilephone_number}</p>
                        <p><span>우편번호</span>{orderResult[0].delivery_info.zip_code}</p>
                        <p><span>주소</span>{orderResult[0].delivery_info.address1}</p>
                        <p><span>상세주소</span>{orderResult[0].delivery_info.address2}</p>
                        {orderResult[0].delivery_info.delivery_memo == "" ? null : <p><span>요청사항</span>{orderResult[0].delivery_info.delivery_memo}</p>}
                    </div>
                </div>    
            </div>
            <div className="order-result__payment-info">
                <div className="order-result__sub-title">결제 정보</div>
                <div className="line"><hr></hr></div>
                <div className="order-result__payment-contents">
                    <p><span>주문인</span>{orderResult[0].delivery_info.orderer_name}</p>
                    <p><span>결제수단</span>{orderResult[0].payment_info.payment}</p>
                    {orderResult[0].payment_info.payment == "" ? null : 
                    <p><span>입금 계좌</span>모두 은행:010101-01-010101 &nbsp; 예금주: 모두홈</p>}

                    <p><span>결제금액</span>{util.formatPrice(orderResult[0].payment_info.total_price)}원</p>
                </div>
            </div>
            <div className="order-result__btn">
                <Link to="/">
                    <div className="to-home_btn">
                            <span>홈으로</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    orderResult : state.order.orders
});


// export default OrderResult;
export default connect(mapStateToProps, null)(OrderResult)