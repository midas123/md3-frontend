import React from 'react';
import { connect } from 'react-redux';
import { quantityUp, quantityDown }  from '../../services/order/actions';

function Quantity(props){
// class Quantity extends React.Component {
//     constructor(props) {
//       super(props);
      
//       this.state = {
//         //   quantity: 1
//         }
//       this.increment = this.increment.bind(this);
//       this.decrement = this.decrement.bind(this);
//     }

    const increment = (quantity, id) => {
        console.log("increment");
        this.props.updateQuantity(quantity, id);
        
        // props.quantityUp(quantity);
        // this.setState(prevState => ({
            //     quantity: ++prevState.quantity
            // }));
            
        }
        
        const decrement= (quantity, id) => {
            console.log("decrement")
            this.props.updateQuantity(quantity, id);
            // props.quantityDown(quantity, id);
        //  this.setState(prevState => ({
        //     quantity: prevState.quantity > 0 ? (--prevState.quantity) : 0
        // }));
        }

    
    // render(){
        const { option } =props;
        var quantity = Number(option.item_quantity);
        console.log("q: "+quantity);
        // const quantity = props.item_quantity;
        const id = props.id;
        console.log("id: "+id);
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
    // }
    
}
export default Quantity;

// const mapStateToProps = (state, ownProps )=> {
//     const id = ownProps.order.gd_id;
//     return {
//     item_quantity : state.order.orders.map(o => {
//         if(o.gd_id == id)
//             return o.item_quantity;
//     })
//     }};


// const mapDispatchToProps = {
//     quantityUp, quantityDown
// };
  
  
// export default connect(
//     mapStateToProps, mapDispatchToProps
// )(Quantity);