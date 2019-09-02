import React ,{ Component } from 'react';
import { withRouter } from 'react-router';


import './ProductDetail.scss';
import OrderDetails from '../Order/OrderDetails';
import OrderProduct from '../Order/OrderProduct';

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

        // const options = goods.goodsDetail.map(opt => {
        //     return (
        //         <option value={opt.goods_option1} 
        //         stock={opt.goods_stock} 
        //         price={opt.goods_disprice ? opt.goods_disprice:opt.goods_price} 
        //         kinds={opt.gd_id} key={opt.gd_id}>
        //         {opt.goods_option1}
        //         </option>
        //     )
        // });
        
        console.log("goods: "+JSON.stringify(goods.goodsDetail));
        const price = Number(goods.goodsDetail[0].goods_price);
        const disprice = Number(goods.goodsDetail[0].goods_disprice);
        const dis_rate = Math.floor((disprice/price)*100);

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
                                            <span>{price}</span>원
                                        </dt>
                                        <dt className="discount_price">
                                            <span>{disprice}</span>원 
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
                            <OrderDetails goods={goods}/>
                            {/* <OrderProduct goods={goods}/> */}

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