import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../services/cart/actions';


class ProductOrder extends Component {
    constructor(props){
        super(props);

        this.addProductToCart = this.addProductToCart.bind(this);
    }
    
    addProductToCart(e){
        e.preventDefault();
        const { items } = this.props;
        this.props.addToCart(items);
        alert("장바구니에 상품을 추가했습니다.")
    }
    render(){
    return(
        <div className="product_order">
        <div className="buy_btn">
            <a href="#">
                <span>구매하기</span>
            </a>
        </div>
        <div className="cart_btn">
            <a href="#" onClick={(e) => this.addProductToCart(e)}>
                <span>장바구니 담기</span>
            </a>
        </div>

                    {/* 
        <div className="buy_product" onClick={() => {
        console.log("buy_product: "+ goods.goods_id);
        }}>
        </div>     */}

    </div>
    )
    }
}

// export default ProductOrder;

const mapStateToProps = state => ({
    cartProducts : state.cart.products
  });


const mapDispatchToProps = {
     addToCart
};
  
  
export default connect(
    mapStateToProps, mapDispatchToProps
)(ProductOrder);



