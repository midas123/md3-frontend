import React, { Component } from 'react';

import Thumb from '../ThumbNail/ThumbNail';
import util from '../../services/util';

import './OrderForm.scss';
const imagePath = process.env.PUBLIC_URL + '/images/goods/';


function OrderInfo(props){

  const { orders } = props;
  const orderList = orders.map(order=> {
    return(
    <div className="order-item" key={order.gd_id}>
      <Thumb
        classes="order-item__thumb"
        src={imagePath+order.item_thumbnail}
        alt={order.item_name}
        />
      <div className="order-item__details">
        <span className="">상품명</span>
        <p>{order.item_name}</p>
      </div>
      <div>
      <span className="">옵션</span>
        { <p>
          {order.item_option1}{order.item_option2 && '/ '+ order.item_option2}
        </p> }
      </div>
      <div>
      <span className="">수량</span>
          <p>{order.item_quantity}</p>
      </div>
      <div className="order-item__price">
        <p>{util.formatPrice(order.item_price)}원</p>
      </div>
    </div>
    );
  });

  return (
    
    <div className="order-contents">
      {orderList.length == 0 && <div className="no-order">주문 내용이 없습니다.</div>}
      {orderList}
      {props.total_amount == 0 ? null :
        <div><p>총 구매수량: {props.total_amount}</p>
        <p>합계 금액: {util.formatPrice(props.totalprice)}원</p>
        </div>
      }

      
    </div>
    );
  }
  
export default OrderInfo;