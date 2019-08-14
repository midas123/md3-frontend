import React from 'react';


const imagePath = process.env.PUBLIC_URL + '/images/goods/';

class Product extends React.Component{
    render(){
        const goods = this.props.list;

        return(
               <div>
                   
                   {goods.map(goods => {
                       return (
                       <div className="Product_item" key={goods.goods_id}>
                      
                           
                           <img src={imagePath+goods.goods_thumbnail} alt={goods.goods_name}/>     
                           <p className="product_title">{goods.goods_name}</p>
                           <div className="product_price">
                           {goods.goodsDetail[0].goods_price} / {goods.goodsDetail[0].goods_disprice}
                           </div>

                       </div>
                       )
                   })}
                   
               </div>
        );
    }

}


export default Product;