import React from 'react';
import Sort from '../Product_Sort/Product_Sort'

class Container_Header extends React.Component {
    render(){

        return(
            <div className="Product_Container_Header">
                {/* <small className="Product_Count">총({this.props.productCount})개의 상품</small> */}
                <Sort/>
            </div>
            

        )
    }
}

export default Container_Header;