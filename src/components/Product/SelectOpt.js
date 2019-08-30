import React, {Component} from 'react';


class SelectOpt extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '옵션 선택',
        dynamic_option: ''
    };
  
      this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    
    handleSelectChange(event){
        console.log("handleSelectChange: "+event.target.value);
        this.setState({
            value: event.target.value
        })
        console.log(this.state.value);
        this.addOptions();
    };
    
    addOptions(){
        if(this.state.value !== '옵션 선택'){
            console.log("test");
            this.setState({
                dynamic_option: (
                <div>
                    {this.state.value}
                </div>
                )
            })
        }
    }
    
    render(){

    const {goods} = this.props;

    const options = goods.goodsDetail.map(opt => {
        return (
            <option value={opt.goods_option1} 
                data-stock={opt.goods_stock} 
                data-price={opt.goods_disprice ? opt.goods_disprice:opt.goods_price} 
                data-kinds={opt.gd_id} key={opt.gd_id}>
                {opt.goods_option1}
                </option>
        )   
    });

    return(
        
        <div className="product_option">
            <select id="option" onChange={this.handleSelectChange}>
                <option defaultValue="none" value="opt-default">-옵션 선택-</option>
                {options}
                </select>
            <div className="option_added">
                {this.state.dynamic_option}
                {/* {dynamic_option ? dynamic_option : null} */}
            </div>
        </div>
    )

    }

}

export default SelectOpt;