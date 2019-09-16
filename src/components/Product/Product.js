import React from 'react';
import { Link } from "react-router-dom";

import  util from '../../services/util/util';
import './Product.scss';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';

function Product(props){
    
    const goods = props.product;

    return(
        <Link key={goods.goods_id} to={{
            pathname: `/goods/${goods.goods_id}`,
            state: { modal : true }
            }}>
        <div className="Product_item" key={goods.goods_id} >
            <img src={imagePath+goods.goods_thumbnail} alt={goods.goods_name}/>     
            <p className="product_title">{goods.goods_name}</p>
            <div className="product_price">
                <div className="original">
                    <del>
                    {util.formatPrice(goods.goodsDetail[0].goods_price)} 
                    </del>
                원
                </div>
                <div className="dis">
                    <span>
                {util.formatPrice(goods.goodsDetail[0].goods_disprice)}
                    </span>
                원
                </div>
            </div>
            <div className="emphasis">

            </div>
        </div>
        </Link>
       
    );
}
export default Product;

