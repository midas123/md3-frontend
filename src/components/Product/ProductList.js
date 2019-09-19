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

  handleCategory = (category, e) => {
    e.preventDefault();
    console.log("handlecategory: "+category)
    this.props.updateCategory(category);
}

  render() {
    const { goodsList } = this.props;
    console.log("goodsList: "+goodsList.length)
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


