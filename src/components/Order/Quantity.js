import React from 'react';
import { connect } from 'react-redux';
import { quantityUp, quantityDown }  from '../../services/order/actions';

function Quantity(props){
    const increment = (quantity, id) => {
        console.log("increment");
        this.props.updateQuantity(quantity, id);
        }
        
        const decrement= (quantity, id) => {
            console.log("decrement")
            this.props.updateQuantity(quantity, id);
        }

    
        const { option } =props;
        var quantity = Number(option.item_quantity);
        const id = props.id;
        var updateQuantity = props.updateQuantity;
        var deleteItem = props.deleteItem;

        return (
        <div className="quantity_input">
            <input type="text" value={quantity} readOnly />
                <a onClick={() =>updateQuantity(quantity+1, id)}>
                <span>+</span></a>
                <a onClick={() => { if(quantity<2) return ; updateQuantity(quantity-1, id)}}>
                <span>-</span></a>
                <a onClick={() => deleteItem(id)}><span className="option_del_btn">취소</span></a>
        </div>  
        )
    
}
export default Quantity;
