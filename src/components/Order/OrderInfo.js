import React, { Component } from 'react';

import Thumb from '../ThumbNail/ThumbNail';
import util from '../../services/util/util';

import './OrderInfo.scss';
const imagePath = process.env.PUBLIC_URL + '/images/goods/';


function OrderInfo(props){

  const { orders } = props;
  console.log("OrderInfo:"+JSON.stringify(orders));
  const orderList = orders.map(order=> {
    return(
    <div className="order-item" key={order.gd_id}>
      <Thumb
        classes="order-item__thumb"
        src={imagePath+order.item_thumbnail}
        alt={order.item_name}
        />
      <div className="order-item__detail">
        <div className="order-item__name">
          <span>상품명:</span>
          {order.item_name}
        </div>
        <div className="order-item__option">
          <span>옵션:</span>
            {order.item_option1}{order.item_option2 && '/ '+ order.item_option2}
        </div>
        <div className="order-item__quantity">
          <span>수량:</span>
            {order.item_quantity}
        </div>
        <div className="order-item__price">
          <span>가격:</span>{util.formatPrice(order.item_price)}원
        </div>
      </div>  
    </div>
    );
  });

  return (
    
    <div className="order-contents">
      {orderList.length == 0 && <div className="no-order">주문 내용이 없습니다.</div>}
      {orderList}
      {props.total_amount == 0 ? null :
        <div className="order-contents__total">
            <p><b>합계</b></p>
          <p>상품 수량: {props.total_amount}</p>
        <p>상품 가격: {util.formatPrice(props.totalprice)}원</p>
        </div>
      }

      
    </div>
    );
  }
  
export default OrderInfo;