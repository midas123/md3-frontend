import React from 'react';
import Product from '../Product/Product'

class Product_Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {goodsList:[]};
      }
    
      componentDidMount(){
        fetch('/api/goods/all')
        .then(response => response.json()
        )
    
        .then(jsonData => {
          console.log("this")
          this.setState({goodsList: jsonData})
        
        })
      }
    render(){
        return(
            <div className="Product_Container">
                 <Product list={this.state.goodsList} />
            
            
            
            </div>
        );
    }

}


export default Product_Container;