import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formValidator from './FormValidator';

import './DeliveryInfo.scss';

class DeliveryInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipient_name:'',
            mobilephone_number:'',
            email_address:'',
            zip_code:'',
            address1:'',
            address2:'',
            delivery_memo:'',

            // isAllValid: false,
            isNameValid: false,
            isPhoneNumberValid: false,
            isEmailValid: false,
            isZipCodeValid: false,
            isAddress2Valid: false,
            isMemoValid: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        const target =e.target;
        const name = target.name;
        const value = target.value;
        var valid = formValidator(target);
        console.log("valid: "+valid.isValid+" "+valid.name);

        if(valid.isValid){
            this.setState({
                [valid.name]:valid.isValid
            })
        } else {
            this.setState({
                [valid.name]:false
            })
        }

        this.setState({
            [name] : value
        })
    }


    render(){

        return(
        <div className="delivery-contents">
            <div className="recipient">
            <div className="info">수령인</div><input type="text" name="recipient_name" 
            size="5" maxLength="15" value={this.state.recipient_name} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isNameValid ? 'O':'X'}</div>
            </div>
            <div className="mobile-phone">
            <div className="info">휴대폰 번호</div><input type="text" name="mobilephone_number" 
            size="13" maxLength="13" value={this.state.mobilephone_number} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isPhoneNumberValid ? 'O':'X'}</div>
            </div>
            <div className="email-address">
            <div className="info">이메일 주소</div><input type="text" name="email_address" 
            size="30" maxLength="30" value={this.state.email_address} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isEmailValid ? 'O':'X'}</div>
            </div>
            <div className="zipcode">
            <div className="info">우편번호</div><input type="text" name="zip_code" 
            size="5" maxLength="6" value={this.state.zip_code} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isZipCodeValid ? 'O':'X'}</div>
            </div>
            <div className="address1">
            <div className="info">배송지 주소</div><input type="text" name="address1" 
            size="30" maxLength="30" value={this.state.address1} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isAddress1Valid ? 'O':'X'}</div>
            </div>
            <div className="address2">
            <div className="info">상세 주소</div><input type="text" name="address2" 
            size="38" maxLength="40" value={this.state.address2} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isAddress2Valid ? 'O':'X'}</div>
            </div>
            <div className="memo">
            <div className="info">요청 사항</div>
            <textarea name="delivery_memo" cols="40" rows="5" maxLength="200" 
            value={this.state.delivery_memo} onChange={this.handleInputChange}/>
            <div className="valid-check-sign">{this.state.isMemoValid ? 'O':'X'}</div>
            </div>
        </div>
        )
    };

}

DeliveryInfo.propTypes = {
    recipient_name:PropTypes.string,
    mobilephone_number:PropTypes.string,
    zip_code:PropTypes.string,
    address1:PropTypes.string,
    address2:PropTypes.string,
    delivery_memo:PropTypes.string
};

export default DeliveryInfo;