import React from 'react'
import Container_Header from '../Product_header/Product_header';
import Product from './Product';


class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };

  }
  render() {
    console.log("ProductList")
    const { goodsList } = this.props;
    const products = goodsList.map(p => {
      return (
          <Product product={p} buyProduct={this.buyProduct} key={p.goods_id} />
        );
      });    
      return (
        <div className="Product_Container">
            <Container_Header productCount={goodsList.length}/>
            {products}
      </div>
    )
  }
}
export default ProductList;