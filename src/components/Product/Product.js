import React from 'react';
import { Link } from "react-router-dom";

import './Product.scss';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';

function Product(props){
    
    const goods = props.product;
    goods.quantity = 1; //장바구니에 추가될 상품 수량

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
                    {goods.goodsDetail[0].goods_price} 
                    </del>
                원
                </div>
                <div className="dis">
                    <span>
                {goods.goodsDetail[0].goods_disprice}
                    </span>
                원
                </div>
            </div>
            <div className="emphasis">

            </div>
            {/* <div className="add_to_cart" onClick={() => {
                console.log("add_to_cart: "+ goods.goods_id);
                props.addProduct(goods)}}>상품 담기</div>
            <div className="buy_product" onClick={() => {
                console.log("buy_product: "+ goods.goods_id);
                
            }}>
            </div>     */}
        </div>
        </Link>
       
    );
}
export default Product;

