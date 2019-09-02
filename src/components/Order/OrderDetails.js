import React, {Component} from 'react';

import { connect } from 'react-redux';
import { addOrder, quantityUp, quantityDown, loadOrders }  from '../../services/order/actions';
import { addProduct } from '../../services/cart/actions';

import Quantity from './Quantity';


class OrderDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        total_quantity: 0,
        total_price:0,
        options: []
    };
  
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.updateQuantity = this.updateQuantity.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.checkDuplication = this.checkDuplication.bind(this);
    //   this.CalculateTotal = this.CalculateTotal.bind(this);
    }
    handleSelectChange(event){
        const { target } = event;
        const index = target.selectedIndex;
        const goodsOption = target[index].value;
        const stock = Number(target[index].getAttribute('data-stock'));
        const price = Number(target[index].getAttribute('data-price'));
        const id = target[index].getAttribute('data-id');
        const quantity = 1;

        console.log("handleSelectChange: "+target[index].getAttribute('data-price'));
        
        if(stock < 1){
            alert("품절된 상품입니다.")
            return;
        }

        const prev_array_opt = this.state.options;
        var booleanValue = this.checkDuplication(prev_array_opt, goodsOption);
        
        console.log("33: "+booleanValue);
        if(prev_array_opt.length>0 && booleanValue)
        {
            console.log("44: "+booleanValue);
            alert("이미 추가한 상품입니다.")
            return;
        }
        var option ={
            gd_id: id,
            item_quantity: quantity,
            item_option1: goodsOption,
            item_option2: "",
            item_price: price
        }

        this.setState(prevState => ({
            options: [...prevState.options, option],
            total_price : prevState.total_price + price,
            total_quantity : prevState.total_quantity + quantity
        }))
    };

    checkDuplication(array_opt, goodsOption){
        var bool = 0
        array_opt.map(opt => {
            if(opt.item_option1 == goodsOption){
                console.log("44")
                bool = 1;
            }
        })
        return bool;
    }


    updateQuantity(q, id){
        this.setState(prevState => ({
            options: prevState.options.map(opt => {
                if(opt.gd_id !== id){

                    return opt;
                }
                return {
                    ...opt,
                    item_quantity: q
                }
                })
        } 
        ), ()=> this.CalculateTotal())
    }

    deleteItem(id){
        console.log("deleteItem");
        var array = [...this.state.options];
        var itemIndex;
        array.map((item, index) =>{
            if(item.gd_id == id){
                itemIndex = index;
            }
        })
        array.splice(itemIndex, 1);
        this.setState({
            options:array
        }, ()=>this.CalculateTotal())
    }

    CalculateTotal(){
        console.log("CalculateTotal: "+JSON.stringify(this.state.options));
            var total_price=0;
            var total_quantity = 0;

            const array = this.state.options;
            array.map(i =>{
            total_price = total_price + (i.item_price*i.item_quantity);
            total_quantity = total_quantity + Number(i.item_quantity);
            })

        this.setState(
            {
            total_price:total_price,
            total_quantity:total_quantity
        })
    }

    render(){
        const {goods} = this.props;
        
        const selectOptions = goods.goodsDetail.map(opt => {
            console.log("opt: "+opt.goods_disprice);
            return (

                <option id="opt" value={opt.goods_option1} 
                data-stock={opt.goods_stock} 
                data-price={opt.goods_disprice ? opt.goods_disprice:opt.goods_price} 
                data-id={opt.gd_id} key={opt.gd_id}>
                {opt.goods_option1}
                </option>
        )   
    });


    const array = this.state.options;
    console.log("array: "+array);
    var added_options;
    var index =0;
    if(array !== undefined){

        added_options = array.map(opt => {
            return(
                <div className="item" key={index++}>
                   <span>
                       {opt.item_option1}
                       </span> 
                    <Quantity id={opt.gd_id} option={opt} updateQuantity={this.updateQuantity} deleteItem={this.deleteItem}/>
                </div>
        )
    })
    }
    var total = 0;
    if(this.state.total_quantity !==0){
        total =  <div className="total">
        <div className="cost_total">
            <span className="total_count">{this.state.total_quantity}</span>개
            <span className="bar">|</span>
            <strong>
            <span className="total_price">{this.state.total_price}</span>원
            </strong>
        </div>
        </div>
    } else {
        total = null;
    }
    
    return(
        <div className="box_mid">
            <div className="product_option">
                <select className="select_options" onChange={this.handleSelectChange}>
                    <option defaultValue="none" selected disabled>선택옵션</option>
                    {selectOptions}
                </select>
                <hr></hr>
                    <form>
                    <div className="options_added"><span>옵션</span>
                        {added_options}
                    </div>
                    </form>
            </div>
            <div className="box_downer">
                {total}
                <div className="total_name">
                합계
                </div>
            <div className="product_order">
                <div className="buy_btn">
                    <a href="#">
                        <span>구매하기</span>
                    </a>
                </div>
                <div className="cart_btn">
                    <a href="#" onClick={() => {
    console.log("add_to_cart: "+ goods.goods_id);
    this.props.addProduct(goods)}}>
                        <span>장바구니</span>
                    </a>
                </div>

                            {/* <div className="add_to_cart" onClick={() => {
                console.log("add_to_cart: "+ goods.goods_id);
                props.addProduct(goods)}}>상품 담기</div>


                <div className="buy_product" onClick={() => {
                console.log("buy_product: "+ goods.goods_id);
                }}>
                </div>     */}

            </div>
    </div>
</div>
    )

    }

}

//export default SelectOption;
const mapStateToProps = state => ({
    order : state.order.addOrder,
    orderList : state.order.orders,
    cart : state.cart.productToAdd
  });


const mapDispatchToProps = {
    addOrder, quantityUp, quantityDown, loadOrders, addProduct
};
  
  
export default connect(
    mapStateToProps, mapDispatchToProps
)(OrderDetails);