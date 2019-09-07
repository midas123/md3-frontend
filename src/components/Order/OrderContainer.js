import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../../services/order/actions';
import OrderInfo from './OrderInfo';
import DeliveryInfo from './DeliveryInfo';



class OrderContainer extends Component {
    constructor(props){
        super(props);
        this.state ={}
    }
    
    orderProduct = (order) => {
        console.log("주문")
        if(order.length === 0){
            alert("주문할 상품이 없습니다.")
            return;
        }
        this.props.fetchOrder(order);
    }
    
    cancelOrdering =(e) =>{
        e.preventDefault();
        console.log("주문 취소")
        this.props.history.goBack();
        //clear action
    }

    render(){
        const { order } = this.props;
        console.log("orderpage: "+JSON.stringify(order));
        return(
            
            <div className="order-page">
                <form>
                    <div className="order-title">주문/결제</div>
                    <div className="order-info">상품 정보</div>
                    <div className="line"><hr></hr> </div>
                        <OrderInfo orders={order}/>
                    <div className="delivery-info">배송지 정보</div>
                    <div className="line"><hr></hr></div>
                        <DeliveryInfo/>
                    <div className="order-payment">결제 방법</div>
                    <div className="line"><hr></hr></div>
                    <div className="order-page-btn">
                    <div className="buy_btn" onClick={(e) => this.orderProduct(order)}>
                            <span>결제 하기</span>
                    </div>
                    <div className="cancel_btn" onClick={(e) => this.cancelOrdering(e)}>
                            <span>취소</span>
                    </div>
                    </div>
                </form>
            </div>
    )
    }
}

const mapStateToProps = state => ({
    order:state.order.preOrder
});

const mapDispatchToProps = {
    fetchOrder
    };

//export default OrderPage;
export default connect(
mapStateToProps, mapDispatchToProps
)(OrderContainer);