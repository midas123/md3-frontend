import React from 'react';
import { connect } from 'react-redux';


import { loadCart, removeProduct } from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './CartProduct';
import util from '../../services/util';

import './Cart.scss';

class Cart extends React.Component {
    state ={
        isOpen: false,
        sumPrice : ''
    }


    componentWillReceiveProps(nextProps) {
      if (nextProps.newProduct !== this.props.newProduct) {
        this.addProduct(nextProps.newProduct);
      }
  
      if (nextProps.productToRemove !== this.props.productToRemove) {
        this.removeProduct(nextProps.productToRemove);
      }

    }
    addProduct = product => {
      const { cartProducts, updateCart } = this.props;
      let productAlreadyInCart = false;
  
      cartProducts.forEach(cp => { //상품 중복시 수량 증가
        if (cp.goods_id === product.goods_id) {
          cp.quantity += product.quantity;
          productAlreadyInCart = true;
        }
      });
  
      if (!productAlreadyInCart) { //장바구니 객채에 상품 추가
        cartProducts.push(product);
      }
  
      updateCart(cartProducts); //장바구니 state 업데이트
      this.openFloatCart();
    };


    removeProduct = product => {
      const { cartProducts, updateCart } = this.props;
  
      const index = cartProducts.findIndex(p => p.goods_id === product.goods_id);
      if (index >= 0) {
        cartProducts.splice(index, 1);
        updateCart(cartProducts);
      }
    };

    openFloatCart = () => {
        this.setState({ isOpen: true });
      
      };
    
    closeFloatCart = () => {
    this.setState({ isOpen: false });
    };

    proceedToCheckout = () => {
      const {
        totalPrice,
        productQuantity,
        currencyFormat,
        currencyId
      } = this.props.cartTotal;
  
      if (!productQuantity) {
        alert('Add some product in the bag!');
      } else {
        alert(
          // `Checkout - Subtotal: ${currencyFormat} ${util.formatPrice(
          //   totalPrice,
          //   currencyId
          // )}`
        );
      }
    };

    render(){
        const { cartTotal, cartProducts, removeProduct, } = this.props;
        const products = cartProducts.map(p => {
            return (
                <CartProduct product={p} removeProduct={removeProduct} key={p.goods_id} />
            );
        });

        let classes = ['float-cart'];

        if (!!this.state.isOpen) {
            classes.push('float-cart--open');
        }

        return (
            <div className={classes.join(' ')}>
            {this.state.isOpen && (
            <div
                onClick={() => this.closeFloatCart()}
                className="float-cart__close-btn"
            >
                X
            </div>
            )}

        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotal.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            </span>
            <span className="header-title">장바구니</span>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <p className="shelf-empty">
                장바구니가 비어있습니다. <br />
               
              </p>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">합계</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {/* {cartTotal.currencyFormat}  */}
                {util.formatPrice(cartTotal.totalPrice)}
                  {cartTotal.currencyId}
              </p>
      
            </div>
            <div onClick={() => this.proceedToCheckout()} className="buy-btn">
              구매하기
            </div>
          </div>
        </div>
      </div>
    );
    }
}

//export default Cart;

const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    newProduct: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    cartTotal: state.total.data,
    goodsList: state.goods.goodsList
  });
  
  export default connect(
    mapStateToProps,
    { loadCart, updateCart, removeProduct }
  )(Cart);