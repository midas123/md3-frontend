import React, { Component } from 'react';

import Thumb from '../ThumbNail/ThumbNail';
import util from '../../services/util';

import './OrderForm.scss';
const imagePath = process.env.PUBLIC_URL + '/images/goods/';


function OrderInfo(props){



  const { orders } = props;
  console.log("orderform: "+JSON.stringify(orders));
  const orderList = orders.map(order=> {
    return(
    <div className="order-item">
      <Thumb
        classes="order-item__thumb"
        src={imagePath+order.item_thumbnail}
        alt={order.item_name}
        />
      <div className="order-item__details">
        <p className="title">{order.item_name}</p>
      </div>
      <div>
        { <p className="desc">
          {order.item_option1} / {order.item_option2 !== null && order.item_option2} <br />
        </p> }
      </div>
      <div>
          <span> 수량:</span>
          {order.item_quantity}
      </div>
      <div className="order-item__price">
        {util.formatPrice(order.item_price)}원
      </div>

    </div>
    );
  });

  return (
    
      <div className="order-contents">
      {orderList.length == 0 && <div className="no-order">주문 내용이 없습니다.</div>}
      {orderList}
    </div>
    );
  }
  
export default OrderInfo;