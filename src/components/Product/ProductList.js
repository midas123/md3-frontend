import React from 'react'
import Container_Header from '../Product_header/Product_header';
import Product from './Product';
import Pagination from '../Pagination/Pagination'

import './ProductList.scss';

class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };

  }
  render() {
    console.log("ProductList")
    const { goodsList } = this.props;
    const { pager } = this.props;
    const products = goodsList.map(p => {
      return (
          <Product product={p} buyProduct={this.buyProduct} key={p.goods_id} />
        );
      });    
      return (
      <div className="Product_Container">
            <Container_Header app_sort={this.props.app_sort}/>
            <div className="product_list">
              {products}
            </div>
            <Pagination pager={pager} UpdatingCurrentPage={this.props.handleCurrentPage}/>
      </div>
    )
  }
}
export default ProductList;