import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrder, clearOrder } from '../../services/order/actions';
import { Redirect } from 'react-router';


import OrderInfo from './OrderInfo';
import DeliveryInfo from './DeliveryInfo';
import PaymentMethod from './PaymentMethod';



class OrderContainer extends Component {
    constructor(props){
        super(props);
        this.state ={
            // isOrdererValid: false,
            isNameValid: false,
            isPhoneNumberValid: false,
            isEmailValid: false,
            isAddress1Valid: false,
            isAddress2Valid: false,
            isZipCodeValid: false,

            delivery_info:{
                recipient_name:'',
                mobilephone_number:'',
                email_address:'',
                zip_code:'',
                address1:'',
                address2:'',
                delivery_memo:''
            },

            isPaymentChecked: false,

            payment_info:{
                payment:''
            },

            redirect: false
        }
    }
 

    componentDidMount () {
        //결제모듈 js추가
        const src =[
            "https://code.jquery.com/jquery-1.12.4.min.js",
            "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ]
        var i ;
        for(i of src){
            const script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = i;
            script.async = true;
            document.body.appendChild(script);
        }
    }

    componentWillUnmount(){
        this.props.clearOrder();
    }
  

    orderProduct = (orders, total_price) => {
        if(orders.length === 0){
            alert("주문할 상품이 없습니다.")
            return;
        }
        if(!(this.state.isNameValid && this.state.isPhoneNumberValid &&
            this.state.isEmailValid && this.state.isAddress1Valid && this.state.isAddress2Valid)){
                alert("배송 정보를 정확히 입력해주세요.")
                return;
        }

        if(!this.state.isPaymentChecked){
            alert("결제 방법을 선택해주세요.")
            return;
        }
        
        const delivery_info = this.state.delivery_info;
        const payment_info = this.state.payment_info;

        let readyOrder = orders.map(o=>{
            return {
                ...o,
                "delivery_info":delivery_info,
                "payment_info":payment_info
            }
        })
     
        this.props.fetchOrder(readyOrder, total_price, ()=>{
            this.setState({
                redirect:true
            })
        });

    }
 
    
    cancelOrdering =() =>{
        this.props.history.go(-2);
    }
    
    handleDeliveryValid = (valid) => {
        this.setState({
            [valid.name]:valid.isValid
        })
    }
    
    handleDeliveryInfo = (target) =>{
        const name = target.name;
        const value = target.value;
        this.setState({
            delivery_info:{...this.state.delivery_info,
                [name] : value
            }
        })
    }
    handlePaymentInfo = (target) =>{
        const name = target.name;
        const value = target.value;
        this.setState({
            "payment_info": {
                [name] : value,
            },
            isPaymentChecked:true
        })
    }
 
    render(){
        const { orderResult } = this.props;
        // if (orderResult && orderResult.length !== 0) {
        if(this.state.redirect) {   
            return <Redirect push to="/orderResult"/>;
        }

        const orders = this.props.order;
        var total_amount = 0;
        var total_price = 0;
        orders.map(order=> {
            total_amount += order.item_quantity;
            total_price += order.item_price*order.item_quantity;
        })

        return(
            
        <div className="order-page">
            <form onSubmit={this.handleSubmit}>
                <div className="order-title">주문/결제</div>
                <div className="order-info">
                    상품 정보
                    <div className="line"><hr></hr> </div>
                </div>
                    <OrderInfo orders={orders} totalprice={total_price} 
                    total_amount={total_amount}/>
                <div className="delivery-info">
                    배송지 정보
                    <div className="line"><hr></hr></div>
                </div>
                    <DeliveryInfo handleDeliveryValid={this.handleDeliveryValid}
                    handleDeliveryInfo={this.handleDeliveryInfo}/>
                <div className="order-payment">
                    결제 방법
                    <div className="line"><hr></hr></div>
                </div>
                    <PaymentMethod handlePaymentInfo={this.handlePaymentInfo}
                    totalprice={total_price}/>
                <div className="order-page-btn">
                    <div className="buy_btn" onClick={() => this.orderProduct(orders, total_price)}>
                            <span>결제 하기</span>
                    </div>
                    <div className="cancel_btn" onClick={() => this.cancelOrdering()}>
                            <span>취소</span>
                    </div>
                </div>
            </form>
        </div>
    )
    }
}

const mapStateToProps = state => ({
    order: state.order.preOrder,
    orderResult: state.order.orders
});

const mapDispatchToProps = {
    fetchOrder, clearOrder
    };

//export default OrderPage;
export default connect(
mapStateToProps, mapDispatchToProps
)(OrderContainer);