import React ,{ Component } from 'react';
import { withRouter } from 'react-router';

import  util from '../../services/util';
import './ProductDetail.scss';
import ProductOption from '../Order/ProductOption';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';


function ProductDetail({match}) {
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
        
        const price = Number(goods.goodsDetail[0].goods_price);
        const disprice = Number(goods.goodsDetail[0].goods_disprice);
        const dis_rate = Math.floor((1-disprice/price)*100);

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
                                    <dl>
                                        <dt className="product_brand">
                                            <span>{goods.goods_brname}</span>
                                        </dt>
                                        <dt className="product_name">
                                            <strong>{goods.goods_name}</strong>
                                        </dt>
                                        <dt className="original_price">
                                            <span>{util.formatPrice(price)}</span>원
                                        </dt>
                                        <dt className="discount_price">
                                            <span>{util.formatPrice(disprice)}</span>원 
                                            <span className="discount_rate">({dis_rate}%할인)</span>
                                        </dt>
                                    </dl>
                                </div>
                                <div className="delivery_cost">
                                    <span>2,500 원 (
                                        30,000원 이상 무료 )</span>
                                    <span>(선결제)</span>
                                </div>
                            </div>
                            <ProductOption goods={goods}/>
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