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
              src={imagePath+product.item_thumbnail}
              alt={product.item_name}
            />
            <div className="shelf-item__details">
              <p className="title">{product.item_name}</p>
              { <p className="desc">
                {product.item_option1} / {product.item_option2 !== null && product.item_option2} <br />
                수량: {product.item_quantity}
              </p> }
            </div>
            <div className="shelf-item__price">
              {util.formatPrice(product.item_price)}원
            </div>
    
            <div className="clearfix" />
          </div>
        );
    }
}

export default CartProduct;