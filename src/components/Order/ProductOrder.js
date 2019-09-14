import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../services/cart/actions';
import { readyOrder } from '../../services/order/actions';

import { Redirect } from 'react-router';


class ProductOrder extends Component {
    constructor(props){
        super(props);   
        this.state = {
            redirect: false
        }
        this.addProductToCart = this.addProductToCart.bind(this);
        this.orderProduct = this.orderProduct.bind(this);

    }
    
    addProductToCart(){
        const { items } = this.props;
        if(items.length ==0){
            alert("장바구니에 추가할 상품을 선택해주세요.")
            return;
        }
        console.log("addProductToCart: "+JSON.stringify(items))
        this.props.addToCart(items);
        alert("장바구니에 상품을 추가했습니다.")
    }

    orderProduct(){
        var token = localStorage.getItem("accessToken");
        console.log("토큰: "+token)
        if(!token){
            alert("로그인 후 이용가능합니다.")
            return;
        }


        const { items } = this.props;
        if(items.length ==0){
            alert("구매할 상품을 추가해주세요.")
            return;
        }
        this.props.readyOrder(items);
        this.setState({redirect: true});
        // window.open('/order/');
        // window.location.href = '/order';
    }

    render(){
        if (this.state.redirect) {
            return <Redirect push to="/order"/>;
          }
    return(

        <div className="product_order">
        <div className="buy_btn">
            <a href="#" onClick={() => this.orderProduct()}>
                <span>구매하기</span>
            </a>
        </div>
        <div className="cart_btn">
            <a href="#" onClick={() => this.addProductToCart()}>
                <span>장바구니 담기</span>
            </a>
        </div>
    </div>
    )
    }
}

// export default ProductOrder;

// const mapStateToProps = state => ({
//     cartProducts : state.cart.products,
//     order : state.order.pre_order
//   });


const mapDispatchToProps = {
     addToCart, readyOrder
};
  
  
export default connect(
    null, mapDispatchToProps
)(ProductOrder);


