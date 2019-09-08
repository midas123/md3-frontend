import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formValidator from './FormValidator';

import DaumPostcode from 'react-daum-postcode';
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
            isAddress1Valid: false,
            isAddress2Valid: false,

            zipcode_style : {
                display: 'none'

            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.zipCodeModal = this.zipCodeModal.bind(this);
    }
    
    handleInputChange(e){
        const target =e.target;
        const name = target.name;
        const value = target.value;
        var valid = formValidator(target);

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
    zipCodeModal(value){
        console.log("zipCodeModal")
        let displayValue = '';
        if(value.display == 'block'){
            displayValue = 'none'
        }
        
        if(value.display == 'none'){
            displayValue = 'block'
        }

        this.setState({
            zipcode_style: {
                display:displayValue
            }
        })
    }

    handleAddress = (data) => {
        let fullAddress = data.address;
        let zipcode = data.postcode;
        let extraAddress = ''; 
        
        if (data.userSelectedType === 'R') { //신주소
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          zipcode = data.zonecode;
        extraAddress = (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
     
        this.setState({
            zipcode_style: {
                display:'none'
            },
            address1: fullAddress,
            address2: extraAddress,
            zip_code: zipcode
        })

      }
    
    render(){
        const zip_box_style =  {
            'boxShadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'transition': 'all 0.3s cubic-bezier(.25,.8,.25,1)'
        }
        return(
        <div className="delivery-contents">
            <div className="recipient">
                <div className="info">수령인</div><input type="text" name="recipient_name" 
                size="5" maxLength="15" value={this.state.recipient_name} onChange={this.handleInputChange}/>
                <div className="valid-check-sign">{this.state.isNameValid ? 
                <div className="check"></div>:<div className="uncheck"></div>}</div>
            </div>
            <div className="mobile-phone">
                <div className="info">휴대폰 번호</div><input type="text" name="mobilephone_number" 
                size="13" maxLength="13" value={this.state.mobilephone_number} onChange={this.handleInputChange}/>
                <div className="valid-check-sign">{this.state.isPhoneNumberValid ? 
                <div className="check"></div>:<div className="uncheck"></div>}</div>
            </div>
            <div className="email-address">
                <div className="info">이메일 주소</div><input type="text" name="email_address" 
                size="30" maxLength="30" value={this.state.email_address} onChange={this.handleInputChange}/>
                <div className="valid-check-sign">{this.state.isEmailValid ? 
                <div className="check"></div>:<div className="uncheck"></div>}</div>
            </div>
            <div className="zipcode">
                <div className="info">우편번호</div><input type="text" name="zip_code" 
                size="7" maxLength="7" value={this.state.zip_code} onChange={this.handleInputChange}
                id="sample4_postcode" />
                <div className="zip-code-btn" onClick={() => this.zipCodeModal(this.state.zipcode_style)}>주소 검색</div>
                <div className="zip-code-box" style={this.state.zipcode_style}>
                    <div className="zip-close-btn" onClick={() => this.zipCodeModal(this.state.zipcode_style)}>X</div>
                    <DaumPostcode onComplete={this.handleAddress} width={450} style={zip_box_style}/>
                </div>
            </div>
            <div className="address1">
                <div className="info">배송지 주소</div><input type="text" name="address1" 
                size="30" maxLength="30" value={this.state.address1} onChange={this.handleInputChange}
                id="sample4_roadAddress"/>
                  <div className="valid-check-sign">{this.state.isAddress1Valid ? 
                <div className="check"></div>:<div className="uncheck"></div>}</div>
            </div>
            <div className="address2">
                <div className="info">상세 주소</div><input type="text" name="address2" 
                size="38" maxLength="40" value={this.state.address2} onChange={this.handleInputChange}
                id="sample4_detailAddress"/>
                <div className="valid-check-sign">{this.state.isAddress2Valid ? 
                <div className="check"></div>:<div className="uncheck"></div>}</div>
            </div>
            <div className="memo">
                <div className="info">요청 사항</div>
                <textarea name="delivery_memo" cols="40" rows="5" maxLength="200" 
                value={this.state.delivery_memo} onChange={this.handleInputChange}/>
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