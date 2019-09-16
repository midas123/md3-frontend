import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { loadCart, removeProduct, clearCart } from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import { readyOrder } from '../../services/order/actions';
import CartProduct from './CartProduct';
import util from '../../services/util/util';


import './MCart.scss';

class MCart extends React.Component {
    state ={
        // isOpen: false,
        // initial: true,
        redirect: false
    }


    componentWillReceiveProps(nextProps) {
      console.log("componentWillReceiveProps");
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
      console.log("cartProducts:"+ JSON.stringify(cartProducts));
  
      cartProducts.forEach(cp => { //상품 중복시 수량 증가
        console.log("check:"+ cp.gd_id);
        if (cp.gd_id === product.gd_id) {
          console.log("quan: "+cp.item_quantity);
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
      console.log("장바구니 비우기")
      // const { clearCart } = this.props;
      // this.props.clearCart();
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
      const { cartProducts } = this.props;
      console.log("proceedToCheckout: "+JSON.stringify(cartProducts))
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
        console.log("cart2: "+JSON.stringify(cartProducts))
        const products = cartProducts.map(p => {
              return (
                <CartProduct product={p} removeProduct={removeProduct} key={p.gd_id} />
            );
        });

     

        return (
        <div className="float-mcart__content">
          <div className="float-mcart__header">
            <span className="header-title">장바구니</span>
            {/* <span onClick={() => this.clearCart()}>장바구니 비우기</span> */}
          </div>

          <div className="float-mcart__shelf-container">
            {!products.length ? 
                <p className="shelf-empty">
                장바구니에 상품이 없습니다.<br />
              </p>
            : products}
          </div>
          {products.length > 0 && 
          <div className="float-mcart__footer">
             <div className="quantity">총&nbsp;{cartTotal.productQuantity}개의 상품</div> 
            <div className="sub">합계</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {util.formatPrice(cartTotal.totalPrice)}
                  {cartTotal.currencyId}
              </p>
      
            </div>
            <div className="mcart-btn">
              <div onClick={() => this.proceedToCheckout()} className="buy-btn">
                구매하기
              </div>
              <div onClick={() => this.closeFloatCart()} className="close-btn">
                  닫기
              </div>
            </div>
          </div>
           }
        </div>
    );
    }
}


const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    newProduct: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    cartTotal: state.total.data
  });
  
  export default connect(
    mapStateToProps,
    { loadCart, updateCart, removeProduct, clearCart, readyOrder }
  )(MCart);