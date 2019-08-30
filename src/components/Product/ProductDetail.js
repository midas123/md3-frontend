import React ,{ Component } from 'react';
import { withRouter } from 'react-router';


import './ProductDetail.scss';
import { tsConstructorType } from '@babel/types';
import SelectOpt from './SelectOpt';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';


function ProductDetail({match}) {
    console.log("ProductDetail");
        const goodNum = match.params.id;
        var goodsList = JSON.parse(localStorage.getItem("goodsList"));
        const goods = goodsList.find(function(element){
            return element.goods_id == goodNum;
        });
        
        if (!goods) {
            return (
                <div>
                    404
                </div>    
                )
            }
        
            
        const images = goods.goodsImages.map(img => {
            return(
                <img src={imagePath+img.image_name} className="product_detail_img" key={img.goods_image_id}/>

                )
        });   

        const options = goods.goodsDetail.map(opt => {
            return (
                <option value={opt.goods_option1} 
                stock={opt.goods_stock} 
                price={opt.goods_disprice ? opt.goods_disprice:opt.goods_price} 
                kinds={opt.gd_id} key={opt.gd_id}>
                {opt.goods_option1}
                </option>
            )
        });
        
        console.log("goods: "+JSON.stringify(goods.goodsDetail));
        return(
            <div className="Product_detail">
                <div className="product_top">
                    <div className="top_left">
                        <img src={imagePath+goods.goods_thumbnail} className="product_img"/>
                    </div>
                    <div className="top_right">
                        <div className="product_box">
                            <div className="box_upper">
                                <div className="product_info">
                                    {/* <p className="product_num">
                                    상품번호 : <span>{goods.goods_id}</span> 
                                    </p> */}
                                    <dl>
                                        <dt className="product_brand">
                                            <span>{goods.goods_brname}</span>
                                        </dt>
                                        <dt className="product_name">
                                            <strong>{goods.goods_name}</strong>
                                        </dt>
                                        <dt className="original_price">
                                            <span>45,000원</span>
                                        </dt>
                                        <dt className="discount_price">
                                            <span>38,000</span>원 
                                            <span className="discount_rate">(16%할인)</span>
                                        </dt>
                                    </dl>
                                </div>
                            </div>
                            <div className="box_mid">
                                <div className="delivery_cost">
                                    <span>2,500 원 (
                                        30,000원 이상 무료 )</span>
                                    <span>(선결제)</span>
                                </div>
                                <div className="product_option">
                                    {/* <select id="option" onChange={this.handleSelectChange}>
                                    <option defaultValue="" value="opt-default">-옵션 선택-</option>
                                       {options}
                                    </select> */}
                                    <SelectOpt goods={goods}/>
                                </div>
                            </div>
                            <div className="box_downer">
                                <div className="total">
                                    <div className="total_name">
                                    합계
                                    </div>
                                    <div className="cost_total">
                                        <span className="total_count">1</span>개
                                        <span className="bar">|</span>
                                        <strong>
                                        <span className="total_price">{goods.goods_disprice ? goods.goods_disprice: goods.goods_price}</span>원
                                        </strong>
                                    </div>
                                </div>
                                <div className="product_order">
                                    <div className="buy_btn">
                                        <a href="#">
                                            <span>구매하기</span>
                                        </a>
                                    </div>
                                    <div className="cart_btn">
                                        <a href="#">
                                            <span>장바구니</span>
                                        </a>
                                    </div>
                                    {/* <div className="add_to_cart" onClick={() => {
                console.log("add_to_cart: "+ goods.goods_id);
                props.addProduct(goods)}}>상품 담기</div>
            <div className="buy_product" onClick={() => {
                console.log("buy_product: "+ goods.goods_id);
                
            }}>
            </div>     */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product_bottom">
                    <div className="product_contents">
                        {images}


                    </div>
                </div>
            </div>
        )
}

export default withRouter(ProductDetail);