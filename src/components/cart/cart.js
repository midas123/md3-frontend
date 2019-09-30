import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { loadCart, removeProduct, clearCart } from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import { readyOrder } from '../../services/order/actions';
import CartProduct from './CartProduct';
import util from '../../services/util/util';


import './Cart.scss';

class Cart extends React.Component {
    state ={
        isOpen: false,
        initial: true,
        redirect: false
    }


    componentWillReceiveProps(nextProps) {
      if (nextProps.newProduct !== this.props.newProduct) {
        // this.addProduct(nextProps.newProduct);
      }
  
      if (nextProps.productToRemove !== this.props.productToRemove) {
        this.removeProduct(nextProps.productToRemove);
      }

    }
    addProduct = product => {
      const { cartProducts, updateCart } = this.props;
      let productAlreadyInCart = false;
      cartProducts.forEach(cp => { //상품 중복시 수량 증가
        if (cp.gd_id === product.gd_id) {
          cp.item_quantity += product.item_quantity;
          productAlreadyInCart = true;
        }
      });
      
      if (!productAlreadyInCart) { //장바구니 객채에 상품 추가
        cartProducts.push(product);
      } 
      updateCart(cartProducts); //장바구니 state 업데이트
      // this.openFloatCart();
    };


    removeProduct = product => {
      const { cartProducts, updateCart } = this.props;
  
      const index = cartProducts.findIndex(p => p.gd_id === product.gd_id);
      if (index >= 0) {
        cartProducts.splice(index, 1);
        updateCart(cartProducts);
      }
    };

    clearCart = () => {
      this.props.clearCart();
    }
    
    openFloatCart = () => {
      this.setState({ isOpen: true });
      this.setState({ initial: false });
      const { cartProducts, updateCart } = this.props;
      updateCart(cartProducts);
      };
    
    closeFloatCart = () => {
    this.setState({ isOpen: false });

    };

    proceedToCheckout = () => {
      var token = localStorage.getItem("accessToken");
      if(!token){
        alert("로그인 후 이용가능합니다.")
        return;
      }
      const { cartProducts } = this.props;
      const {
        productQuantity
        //totalPrice,
        //currencyFormat,
        //currencyId
      } = this.props.cartTotal;
  
      if (!productQuantity) {
        alert('장바구니에 상품을 추가해주세요.');
      } else {
        this.props.readyOrder(cartProducts);
        this.setState({redirect: true});
     
      }
    };

    render(){
      if (this.state.redirect) {
        return <Redirect push to="/order" state={this.props.items}/>;
      }
        const { cartTotal, cartProducts, removeProduct, } = this.props;
        const products = cartProducts.map(p => {
              return (
                <CartProduct product={p} removeProduct={removeProduct} key={p.gd_id} />
            );
        });

        let classes = ['float-cart'];

        if (!!this.state.isOpen) {
            classes.push('float-cart--open');
        }

        return (
            <div className={classes.join(' ')}>
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            {!this.state.initial && ( 
              <span className="bag__quantity">{cartTotal.productQuantity}</span>
            )}
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
          <div className="clear-cart-btn" onClick={() => this.clearCart()}>장바구니 비우기</div>
            <div className="sub">합계</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {util.formatPrice(cartTotal.totalPrice)}
                  {cartTotal.currencyId}
              </p>
      
            </div>
            <div className="cart-btn">
              <div onClick={() => this.proceedToCheckout()} className="buy-btn">
                구매하기
              </div>
              <div onClick={() => this.closeFloatCart()} className="close-btn">
                  닫기
              </div>
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
    cartTotal: state.total.data
  });
  
  export default connect(
    mapStateToProps,
    { loadCart, updateCart, removeProduct, clearCart, readyOrder }
  )(Cart);