import React, { Component } from 'react';
import util from '../../services/util/util';

import './PaymentMethod.css';

class PaymentMethod extends Component{
    constructor(props){
        super(props);
        this.state ={
            payment:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        console.log("handleInputChange: "+target.value);
        this.setState({
            payment: target.value
        });
        this.props.handlePaymentInfo(target);
    }

    render(){
        return(
            <div className="order-payment-contents">
                <div className="pay-option-box">
                    <div>
                        <label className="pay-option">
                            계좌이체
                            <input type="radio" name="payment" value="계좌이체" 
                                checked={this.state.payment === '계좌이체'} 
                                onChange={this.handleInputChange} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        <label className="pay-option">
                            카드
                            <input type="radio" name="payment" value="card" 
                                checked={this.state.payment === 'card'} 
                                onChange={this.handleInputChange} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="total-order-price">
                       결제금액<span>{this.props.totalprice ? util.formatPrice(this.props.totalprice): 0}</span>원
                   </div>
                </div>    
            </div>
        )
    }
}

export default PaymentMethod;