import React from 'react';

import Thumb from '../ThumbNail/ThumbNail';
import util from '../../services/util';

const imagePath = process.env.PUBLIC_URL + '/images/goods/';


class CartProduct extends React.Component{
    state = {
        isMouseOver: false
      };

    handleMouseOver = () => {
    this.setState({ isMouseOver: true });
    };

    handleMouseOut = () => {
    this.setState({ isMouseOver: false });
    };

    render(){
        const { product, removeProduct } = this.props;
        console.log("@@@@: "+JSON.stringify(product));
        const classes = ['shelf-item'];
    
        if (!!this.state.isMouseOver) {
          classes.push('shelf-item--mouseover');
        }
    
        return (
          <div className={classes.join(' ')}>
            <div
              className="shelf-item__del"
              onMouseOver={() => this.handleMouseOver()}
              onMouseOut={() => this.handleMouseOut()}
              onClick={() => removeProduct(product)}
            />
            <Thumb
              classes="shelf-item__thumb"
              src={imagePath+product.goods_thumbnail}
              alt={product.goods_name}
            />
            <div className="shelf-item__details">
              <p className="title">{product.goods_name}</p>
              { <p className="desc">
                {product.goodsDetail[0].goods_option1} / {product.goodsDetail[0].goods_option2 !== null && product.goodsDetail[0].goods_option2} <br />
                수량: {product.quantity}
              </p> }
            </div>
            <div className="shelf-item__price">
              <p>{util.formatPrice(product.goodsDetail[0].goods_price)}</p>
              {util.formatPrice(product.goodsDetail[0].goods_disprice)}
            </div>
    
            <div className="clearfix" />
          </div>
        );
    }
}

export default CartProduct;