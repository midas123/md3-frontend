import React from 'react';
import Product from '../Product/Product';
import ContainerHeader from '../P_Container_header/P_Container_header';

import './Product_Container.scss';

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
                <ContainerHeader productCount={this.state.goodsList.length}/>
                <Product list={this.state.goodsList} />
            
            
            
            </div>
        );
    }

}


export default Product_Container;