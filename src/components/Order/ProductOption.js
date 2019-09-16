import React, {Component} from 'react';

import  util from '../../services/util/util';
import Quantity from './Quantity';
import ProductOrder from './ProductOrder';


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
      this.addProductToCart = this.addProductToCart.bind(this);
    //   this.CalculateTotal = this.CalculateTotal.bind(this);
    }
    handleSelectChange(event){
        event.preventDefault();
        const { target } = event;
        const index = target.selectedIndex;
        const goodsOption = target[index].value;
        const stock = Number(target[index].getAttribute('data-stock'));
        const price = Number(target[index].getAttribute('data-price'));
        const id = target[index].getAttribute('data-id');
        const goodsname = target[index].getAttribute('data-name');
        const thumbnail = target[index].getAttribute('data-thumbnail');
        const quantity = 1;

        if(target.value == "선택옵션")
            return;

        if(stock < 1){
            alert("품절된 상품입니다.")
            return;
        }

        const prev_array_opt = this.state.options;
        var booleanValue = this.checkDuplication(prev_array_opt, goodsOption);
        
        if(prev_array_opt.length>0 && booleanValue)
        {
            alert("이미 추가한 상품입니다.")
            return;
        }
        var option = {
            gd_id: id,
            item_name : goodsname,
            item_quantity: quantity,
            item_option1: goodsOption,
            item_option2: "",
            item_thumbnail: thumbnail,
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

    addProductToCart(items){
        if(items.length>0){
            console.log("add_to_cart: "+ items.length);
            this.props.addProduct(items);
        }
    }

    render(){
        const {goods} = this.props;
        // goods.quantity = 1; //장바구니에 추가될 상품 수량
        const selectOptions = goods.goodsDetail.map(opt => {
            return (

                <option id="opt" value={opt.goods_option1} 
                data-stock={opt.goods_stock} 
                data-price={opt.goods_disprice ? opt.goods_disprice:opt.goods_price} 
                data-id={opt.gd_id} data-name={goods.goods_name}
                data-thumbnail={goods.goods_thumbnail}
                key={opt.gd_id}>
                {opt.goods_option1}
                </option>
        )   
    });


    const array = this.state.options;
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
            <span className="total_price">{util.formatPrice(this.state.total_price)}</span>원
            </strong>
        </div>
        </div>
    } else {
        total = null;
    }
    const items = this.state.options;
    return(
        <div className="box_mid">
            <div className="product_option">
                <select className="select_options" defaultValue="선택옵션" onChange={this.handleSelectChange}>
                    <option value="선택옵션">선택옵션</option>
                    {selectOptions}
                </select>
                <hr></hr>
                    <form>
                    <div className="options_added"><span>옵션</span>
                        {added_options}
                        {/* <Select options={items}/> */}
                    </div>
                    </form>
            </div>
            <div className="box_downer">
                {total}
                <div className="total_name">
                합계
                </div>
                <ProductOrder items={items}/>
            </div>
</div>
    )

    }

}

export default OrderDetails;