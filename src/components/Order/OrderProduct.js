import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../services/cart/actions'; 

function OrderProduct(){
    
    // const { goods } = this.props;
    return(
        <div>
            
        </div>
    )
}

// export default OrderProduct;

const mapStateToProps = state => ({
    cart : state.cart.products
  });


const mapDispatchToProps = {
    addProduct
};
  
  
export default connect(
    mapStateToProps, mapDispatchToProps
)(OrderProduct);