import React from 'react';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';

function Product(props){
    
    const goods = props.product;
    goods.quantity = 1; //장바구니 수량

    return(
        <div className="Product_item" key={goods.goods_id} >
            <img src={imagePath+goods.goods_thumbnail} alt={goods.goods_name}/>     
            <p className="product_title">{goods.goods_name}</p>
            <div className="product_price">
            {goods.goodsDetail[0].goods_price} / {goods.goodsDetail[0].goods_disprice}
            </div>
            <div className="add_to_cart" onClick={() => {
                console.log("add_to_cart: "+ goods.goods_id);
                props.addProduct(goods)}}>상품 담기</div>
            <div className="buy_product" onClick={() => {
                console.log("buy_product: "+ goods.goods_id);
                
            }}>

                
            </div>    
        </div>
    );
}
export default Product;

